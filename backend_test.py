"""
Comprehensive backend test for Epsilon CMS API
Tests all authentication, public endpoints, protected endpoints, and submissions
"""
import requests
import json
import sys
from typing import Dict, Any, Optional

# Base URL from frontend .env
BASE_URL = "https://squarespace-clone.preview.emergentagent.com/api"

# Test credentials
ADMIN_EMAIL = "admin@epsilon-edu.in"
ADMIN_PASSWORD = "Epsilon@2026"

# Global token storage
auth_token: Optional[str] = None

# Test results tracking
test_results = {
    "passed": [],
    "failed": [],
    "total": 0
}


def log_test(name: str, passed: bool, message: str = ""):
    """Log test result"""
    test_results["total"] += 1
    status = "✅ PASS" if passed else "❌ FAIL"
    result_msg = f"{status} | {name}"
    if message:
        result_msg += f" | {message}"
    print(result_msg)
    
    if passed:
        test_results["passed"].append(name)
    else:
        test_results["failed"].append(name)


def test_login_valid():
    """Test 1: POST /api/auth/login with valid credentials"""
    global auth_token
    try:
        response = requests.post(
            f"{BASE_URL}/auth/login",
            json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if "token" in data and "email" in data:
                auth_token = data["token"]
                log_test("Login with valid credentials", True, f"Token received, email: {data['email']}")
                return True
            else:
                log_test("Login with valid credentials", False, "Missing token or email in response")
                return False
        else:
            log_test("Login with valid credentials", False, f"Status: {response.status_code}, Body: {response.text}")
            return False
    except Exception as e:
        log_test("Login with valid credentials", False, f"Exception: {str(e)}")
        return False


def test_login_invalid():
    """Test 1b: POST /api/auth/login with wrong password"""
    try:
        response = requests.post(
            f"{BASE_URL}/auth/login",
            json={"email": ADMIN_EMAIL, "password": "WrongPassword123"},
            timeout=10
        )
        
        if response.status_code == 401:
            log_test("Login with wrong password returns 401", True)
            return True
        else:
            log_test("Login with wrong password returns 401", False, f"Expected 401, got {response.status_code}")
            return False
    except Exception as e:
        log_test("Login with wrong password returns 401", False, f"Exception: {str(e)}")
        return False


def test_auth_me_with_token():
    """Test 2: GET /api/auth/me with Bearer token"""
    if not auth_token:
        log_test("GET /auth/me with token", False, "No auth token available")
        return False
    
    try:
        response = requests.get(
            f"{BASE_URL}/auth/me",
            headers={"Authorization": f"Bearer {auth_token}"},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if "email" in data:
                log_test("GET /auth/me with token", True, f"Email: {data['email']}")
                return True
            else:
                log_test("GET /auth/me with token", False, "Missing email in response")
                return False
        else:
            log_test("GET /auth/me with token", False, f"Status: {response.status_code}")
            return False
    except Exception as e:
        log_test("GET /auth/me with token", False, f"Exception: {str(e)}")
        return False


def test_auth_me_without_token():
    """Test 2b: GET /api/auth/me without token"""
    try:
        response = requests.get(f"{BASE_URL}/auth/me", timeout=10)
        
        if response.status_code == 401:
            log_test("GET /auth/me without token returns 401", True)
            return True
        else:
            log_test("GET /auth/me without token returns 401", False, f"Expected 401, got {response.status_code}")
            return False
    except Exception as e:
        log_test("GET /auth/me without token returns 401", False, f"Exception: {str(e)}")
        return False


def test_public_endpoints():
    """Test 3: Public GET endpoints (no auth required)"""
    endpoints = [
        "/content/home",
        "/content/beliefs",
        "/programs",
        "/cohorts",
        "/testimonials",
        "/lead-faculty",
        "/guest-lecturers",
        "/insights",
        "/events"
    ]
    
    all_passed = True
    for endpoint in endpoints:
        try:
            response = requests.get(f"{BASE_URL}{endpoint}", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                # Check if data is non-empty
                is_non_empty = False
                if isinstance(data, list):
                    is_non_empty = len(data) > 0
                elif isinstance(data, dict):
                    is_non_empty = len(data) > 0
                
                if is_non_empty:
                    log_test(f"Public GET {endpoint}", True, f"Returned {len(data) if isinstance(data, (list, dict)) else 'data'} items")
                else:
                    log_test(f"Public GET {endpoint}", False, "Empty response")
                    all_passed = False
            else:
                log_test(f"Public GET {endpoint}", False, f"Status: {response.status_code}")
                all_passed = False
        except Exception as e:
            log_test(f"Public GET {endpoint}", False, f"Exception: {str(e)}")
            all_passed = False
    
    return all_passed


def test_protected_without_token():
    """Test 4: Protected PUT/POST/DELETE require Bearer token"""
    tests = [
        ("PUT", "/content/home", {"hero": {"eyebrow": "test"}}),
        ("POST", "/programs", {"title": "test"}),
        ("DELETE", "/programs/test-id", None)
    ]
    
    all_passed = True
    for method, endpoint, body in tests:
        try:
            if method == "PUT":
                response = requests.put(f"{BASE_URL}{endpoint}", json=body, timeout=10)
            elif method == "POST":
                response = requests.post(f"{BASE_URL}{endpoint}", json=body, timeout=10)
            elif method == "DELETE":
                response = requests.delete(f"{BASE_URL}{endpoint}", timeout=10)
            
            if response.status_code == 401:
                log_test(f"Protected {method} {endpoint} without token returns 401", True)
            else:
                log_test(f"Protected {method} {endpoint} without token returns 401", False, f"Expected 401, got {response.status_code}")
                all_passed = False
        except Exception as e:
            log_test(f"Protected {method} {endpoint} without token returns 401", False, f"Exception: {str(e)}")
            all_passed = False
    
    return all_passed


def test_update_home_content():
    """Test 5: PUT /api/content/home with field change"""
    if not auth_token:
        log_test("PUT /content/home update", False, "No auth token available")
        return False
    
    try:
        # First, get current home content
        response = requests.get(f"{BASE_URL}/content/home", timeout=10)
        if response.status_code != 200:
            log_test("PUT /content/home update", False, "Failed to get current home content")
            return False
        
        current_data = response.json()
        original_eyebrow = current_data.get("hero", {}).get("eyebrow", "")
        
        # Update with a small change
        new_eyebrow = "TEST UPDATED EYEBROW"
        update_data = current_data.copy()
        if "hero" not in update_data:
            update_data["hero"] = {}
        update_data["hero"]["eyebrow"] = new_eyebrow
        
        # Send PUT request
        response = requests.put(
            f"{BASE_URL}/content/home",
            json=update_data,
            headers={"Authorization": f"Bearer {auth_token}"},
            timeout=10
        )
        
        if response.status_code != 200:
            log_test("PUT /content/home update", False, f"PUT failed with status {response.status_code}")
            return False
        
        # Verify the change
        response = requests.get(f"{BASE_URL}/content/home", timeout=10)
        if response.status_code == 200:
            updated_data = response.json()
            if updated_data.get("hero", {}).get("eyebrow") == new_eyebrow:
                log_test("PUT /content/home update", True, f"Successfully updated eyebrow to '{new_eyebrow}'")
                
                # Restore original value
                update_data["hero"]["eyebrow"] = original_eyebrow
                requests.put(
                    f"{BASE_URL}/content/home",
                    json=update_data,
                    headers={"Authorization": f"Bearer {auth_token}"},
                    timeout=10
                )
                return True
            else:
                log_test("PUT /content/home update", False, "Change not reflected in GET")
                return False
        else:
            log_test("PUT /content/home update", False, "Failed to verify change")
            return False
    except Exception as e:
        log_test("PUT /content/home update", False, f"Exception: {str(e)}")
        return False


def test_program_crud():
    """Test 6: POST /api/programs, verify, then DELETE"""
    if not auth_token:
        log_test("Program CRUD operations", False, "No auth token available")
        return False
    
    try:
        # Get initial count
        response = requests.get(f"{BASE_URL}/programs", timeout=10)
        if response.status_code != 200:
            log_test("Program CRUD operations", False, "Failed to get initial programs list")
            return False
        
        initial_programs = response.json()
        initial_count = len(initial_programs)
        
        # Create new program
        new_program = {
            "slug": "test-program-crud",
            "title": "Test Program for CRUD",
            "subtitle": "Test Subtitle",
            "tagline": "Test Tagline",
            "weeks": 8,
            "levelLabel": "Test Level",
            "order": 999
        }
        
        response = requests.post(
            f"{BASE_URL}/programs",
            json=new_program,
            headers={"Authorization": f"Bearer {auth_token}"},
            timeout=10
        )
        
        if response.status_code != 200:
            log_test("Program CRUD operations", False, f"POST failed with status {response.status_code}: {response.text}")
            return False
        
        created_program = response.json()
        program_id = created_program.get("_id")
        
        if not program_id:
            log_test("Program CRUD operations", False, "No _id in created program")
            return False
        
        # Verify count increased
        response = requests.get(f"{BASE_URL}/programs", timeout=10)
        if response.status_code != 200:
            log_test("Program CRUD operations", False, "Failed to get programs list after creation")
            return False
        
        after_create_programs = response.json()
        after_create_count = len(after_create_programs)
        
        if after_create_count != initial_count + 1:
            log_test("Program CRUD operations", False, f"Expected {initial_count + 1} programs, got {after_create_count}")
            return False
        
        # Delete the program
        response = requests.delete(
            f"{BASE_URL}/programs/{program_id}",
            headers={"Authorization": f"Bearer {auth_token}"},
            timeout=10
        )
        
        if response.status_code != 200:
            log_test("Program CRUD operations", False, f"DELETE failed with status {response.status_code}")
            return False
        
        # Verify count returned to original
        response = requests.get(f"{BASE_URL}/programs", timeout=10)
        if response.status_code != 200:
            log_test("Program CRUD operations", False, "Failed to get programs list after deletion")
            return False
        
        after_delete_programs = response.json()
        after_delete_count = len(after_delete_programs)
        
        if after_delete_count == initial_count:
            log_test("Program CRUD operations", True, f"Created program (count: {initial_count}→{after_create_count}), then deleted (count: {after_delete_count})")
            return True
        else:
            log_test("Program CRUD operations", False, f"Expected {initial_count} programs after delete, got {after_delete_count}")
            return False
    except Exception as e:
        log_test("Program CRUD operations", False, f"Exception: {str(e)}")
        return False


def test_public_submissions():
    """Test 7: Public POST submissions (no auth)"""
    submissions = [
        ("/submissions/apply", {
            "programme": "Applied AI & ML",
            "fullName": "Rajesh Kumar",
            "email": "rajesh.kumar@example.com",
            "phone": "+91-9876543210",
            "role": "Senior Manager",
            "company": "Tech Corp India",
            "experience": "10 years",
            "why": "Want to lead AI initiatives",
            "heard": "LinkedIn"
        }),
        ("/submissions/contact", {
            "name": "Priya Sharma",
            "email": "priya.sharma@example.com",
            "topic": "Programme Inquiry",
            "message": "I would like to know more about the AI programme"
        }),
        ("/submissions/brochure", {
            "name": "Amit Patel",
            "phone": "+91-9876543211",
            "email": "amit.patel@example.com",
            "course": "Applied AI & ML"
        }),
        ("/submissions/subscribe", {
            "email": "subscribe.test@example.com"
        })
    ]
    
    all_passed = True
    for endpoint, body in submissions:
        try:
            response = requests.post(f"{BASE_URL}{endpoint}", json=body, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("ok") and "id" in data:
                    log_test(f"Public POST {endpoint}", True, f"Submission ID: {data['id']}")
                else:
                    log_test(f"Public POST {endpoint}", False, "Missing 'ok' or 'id' in response")
                    all_passed = False
            else:
                log_test(f"Public POST {endpoint}", False, f"Status: {response.status_code}, Body: {response.text}")
                all_passed = False
        except Exception as e:
            log_test(f"Public POST {endpoint}", False, f"Exception: {str(e)}")
            all_passed = False
    
    return all_passed


def test_submissions_auth():
    """Test 8: GET /api/submissions/apply with and without token"""
    # Test without token
    try:
        response = requests.get(f"{BASE_URL}/submissions/apply", timeout=10)
        
        if response.status_code == 401:
            log_test("GET /submissions/apply without token returns 401", True)
        else:
            log_test("GET /submissions/apply without token returns 401", False, f"Expected 401, got {response.status_code}")
            return False
    except Exception as e:
        log_test("GET /submissions/apply without token returns 401", False, f"Exception: {str(e)}")
        return False
    
    # Test with token
    if not auth_token:
        log_test("GET /submissions/apply with token", False, "No auth token available")
        return False
    
    try:
        response = requests.get(
            f"{BASE_URL}/submissions/apply",
            headers={"Authorization": f"Bearer {auth_token}"},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                # Check if the submission we created earlier is in the list
                has_submission = len(data) > 0
                log_test("GET /submissions/apply with token", True, f"Retrieved {len(data)} submissions")
                return True
            else:
                log_test("GET /submissions/apply with token", False, "Response is not a list")
                return False
        else:
            log_test("GET /submissions/apply with token", False, f"Status: {response.status_code}")
            return False
    except Exception as e:
        log_test("GET /submissions/apply with token", False, f"Exception: {str(e)}")
        return False


def test_admin_stats():
    """Test 9: GET /api/admin/stats with Bearer token"""
    if not auth_token:
        log_test("GET /admin/stats", False, "No auth token available")
        return False
    
    try:
        response = requests.get(
            f"{BASE_URL}/admin/stats",
            headers={"Authorization": f"Bearer {auth_token}"},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            required_fields = ["programs", "testimonials", "lead_faculty", "guest_lecturers", 
                             "insights", "events", "cohorts", "submissions"]
            
            missing_fields = [f for f in required_fields if f not in data]
            
            if not missing_fields:
                if "submissions" in data and isinstance(data["submissions"], dict):
                    submission_fields = ["apply", "contact", "brochure", "subscribe"]
                    missing_sub_fields = [f for f in submission_fields if f not in data["submissions"]]
                    
                    if not missing_sub_fields:
                        log_test("GET /admin/stats", True, f"All stats present: {data}")
                        return True
                    else:
                        log_test("GET /admin/stats", False, f"Missing submission fields: {missing_sub_fields}")
                        return False
                else:
                    log_test("GET /admin/stats", False, "submissions field missing or not a dict")
                    return False
            else:
                log_test("GET /admin/stats", False, f"Missing fields: {missing_fields}")
                return False
        else:
            log_test("GET /admin/stats", False, f"Status: {response.status_code}")
            return False
    except Exception as e:
        log_test("GET /admin/stats", False, f"Exception: {str(e)}")
        return False


def test_change_password():
    """Test 10: POST /api/auth/change-password flow"""
    global auth_token
    
    if not auth_token:
        log_test("Change password flow", False, "No auth token available")
        return False
    
    try:
        # Test with wrong current password
        response = requests.post(
            f"{BASE_URL}/auth/change-password",
            json={"current": "WrongPassword", "new": "NewPassword123"},
            headers={"Authorization": f"Bearer {auth_token}"},
            timeout=10
        )
        
        if response.status_code != 401:
            log_test("Change password with wrong current password", False, f"Expected 401, got {response.status_code}")
            return False
        
        log_test("Change password with wrong current password returns 401", True)
        
        # Change password with correct current password
        new_password = "NewEpsilon@2026"
        response = requests.post(
            f"{BASE_URL}/auth/change-password",
            json={"current": ADMIN_PASSWORD, "new": new_password},
            headers={"Authorization": f"Bearer {auth_token}"},
            timeout=10
        )
        
        if response.status_code != 200:
            log_test("Change password with correct current", False, f"Status: {response.status_code}")
            return False
        
        log_test("Change password with correct current returns 200", True)
        
        # Try login with old password (should fail)
        response = requests.post(
            f"{BASE_URL}/auth/login",
            json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
            timeout=10
        )
        
        if response.status_code != 401:
            log_test("Login with old password after change", False, f"Expected 401, got {response.status_code}")
            return False
        
        log_test("Login with old password after change returns 401", True)
        
        # Try login with new password (should succeed)
        response = requests.post(
            f"{BASE_URL}/auth/login",
            json={"email": ADMIN_EMAIL, "password": new_password},
            timeout=10
        )
        
        if response.status_code != 200:
            log_test("Login with new password", False, f"Status: {response.status_code}")
            return False
        
        data = response.json()
        if "token" not in data:
            log_test("Login with new password", False, "No token in response")
            return False
        
        log_test("Login with new password returns 200", True)
        
        # Update token for reverting password
        auth_token = data["token"]
        
        # Revert password back to original
        response = requests.post(
            f"{BASE_URL}/auth/change-password",
            json={"current": new_password, "new": ADMIN_PASSWORD},
            headers={"Authorization": f"Bearer {auth_token}"},
            timeout=10
        )
        
        if response.status_code != 200:
            log_test("Revert password to original", False, f"Status: {response.status_code}")
            return False
        
        log_test("Revert password to Epsilon@2026", True)
        
        return True
    except Exception as e:
        log_test("Change password flow", False, f"Exception: {str(e)}")
        return False


def main():
    """Run all tests"""
    print("=" * 80)
    print("EPSILON CMS BACKEND API TESTS")
    print("=" * 80)
    print(f"Base URL: {BASE_URL}")
    print(f"Admin Email: {ADMIN_EMAIL}")
    print("=" * 80)
    print()
    
    # Run tests in order
    print("🔐 AUTHENTICATION TESTS")
    print("-" * 80)
    test_login_valid()
    test_login_invalid()
    test_auth_me_with_token()
    test_auth_me_without_token()
    print()
    
    print("🌐 PUBLIC ENDPOINT TESTS")
    print("-" * 80)
    test_public_endpoints()
    print()
    
    print("🔒 PROTECTED ENDPOINT TESTS")
    print("-" * 80)
    test_protected_without_token()
    print()
    
    print("✏️  CONTENT UPDATE TESTS")
    print("-" * 80)
    test_update_home_content()
    print()
    
    print("📝 CRUD OPERATION TESTS")
    print("-" * 80)
    test_program_crud()
    print()
    
    print("📮 PUBLIC SUBMISSION TESTS")
    print("-" * 80)
    test_public_submissions()
    print()
    
    print("📊 SUBMISSION RETRIEVAL TESTS")
    print("-" * 80)
    test_submissions_auth()
    print()
    
    print("📈 ADMIN STATS TESTS")
    print("-" * 80)
    test_admin_stats()
    print()
    
    print("🔑 PASSWORD CHANGE TESTS")
    print("-" * 80)
    test_change_password()
    print()
    
    # Summary
    print("=" * 80)
    print("TEST SUMMARY")
    print("=" * 80)
    print(f"Total Tests: {test_results['total']}")
    print(f"Passed: {len(test_results['passed'])} ✅")
    print(f"Failed: {len(test_results['failed'])} ❌")
    print()
    
    if test_results['failed']:
        print("Failed Tests:")
        for test in test_results['failed']:
            print(f"  ❌ {test}")
        print()
        sys.exit(1)
    else:
        print("🎉 All tests passed!")
        sys.exit(0)


if __name__ == "__main__":
    main()
