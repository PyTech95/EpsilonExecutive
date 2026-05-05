"""Generate Indian student/professional online-learning photos for site-wide use."""
import asyncio, os, base64
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv("/app/backend/.env")
OUT = "/app/frontend/public/generated"
os.makedirs(OUT, exist_ok=True)

BRAND = (
    " Photorealistic editorial-grade photograph. Soft warm cinematic lighting, "
    "shallow depth of field, premium executive education aesthetic. Deep navy "
    "and cream tones in the environment. No text, no logos, ultra-realistic 4k."
)

PROMPTS = {
    "online-class-male-student": (
        "An Indian working professional, male, around 30 years old, sitting at a "
        "wooden desk in a softly lit modern Indian apartment, wearing slim "
        "headphones and smart-casual attire, attentively taking an online class "
        "on a sleek laptop with a faint video-call grid visible on screen. Open "
        "notebook with handwritten notes and a brass desk lamp beside the laptop. "
        "Warm golden evening light through a window behind him, plants in the "
        "background." + BRAND
    ),
    "online-class-female-professional": (
        "An Indian working professional, female, around 32 years old, smart "
        "business-casual attire (soft kurta or shirt), seated at a clean modern "
        "desk in a well-lit home office, deeply focused on a laptop screen "
        "showing a faint online-classroom interface. She is taking handwritten "
        "notes in a leather notebook. A cup of chai, a small plant, and bookshelf "
        "softly blurred behind her. Natural daylight, cinematic." + BRAND
    ),
    "online-class-young-student": (
        "A young Indian student, around 22-24 years old, casual neat attire, "
        "sitting cross-legged on a cushioned chair at a low study desk in a tidy "
        "Indian apartment, headphones on, attentively viewing an online lecture "
        "on a laptop. Notebook, pen, laptop charger, water bottle and a small "
        "warm desk lamp around. Soft window light, books on a shelf in the "
        "background." + BRAND
    ),
    "online-class-collaboration": (
        "An Indian senior professional, age around 38, in a smart navy shirt, "
        "leaning forward at a wide desk with a laptop and external display, mid "
        "online discussion gesturing with one hand, headset on. Glass of water, "
        "notebook, premium pen, dark wood desk. Modern Indian office or studio "
        "interior, sophisticated, low-key warm lighting, bokeh of bookshelf in "
        "the background." + BRAND
    ),
}

async def gen(slug, prompt, attempt):
    api_key = os.environ["EMERGENT_LLM_KEY"]
    chat = LlmChat(
        api_key=api_key,
        session_id=f"epsilon-img-{slug}-{attempt}",
        system_message="You are an image generation assistant.",
    )
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(
        modalities=["image", "text"]
    )
    _, images = await chat.send_message_multimodal_response(UserMessage(text=prompt))
    if images:
        out = os.path.join(OUT, f"{slug}.png")
        with open(out, "wb") as f:
            f.write(base64.b64decode(images[0]["data"]))
        return os.path.getsize(out)
    return 0


async def main():
    for slug, prompt in PROMPTS.items():
        for attempt in range(1, 5):
            try:
                size = await gen(slug, prompt, attempt)
                if size:
                    print(f"OK {slug} ({size//1024} KB) attempt {attempt}")
                    break
            except Exception as e:
                print(f"  attempt {attempt} {slug}: {str(e)[:140]}")
                await asyncio.sleep(3)


if __name__ == "__main__":
    asyncio.run(main())
