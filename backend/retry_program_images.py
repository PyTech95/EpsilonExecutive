"""Retry failed generations."""
import asyncio
import os
import base64
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv("/app/backend/.env")
OUT_DIR = "/app/frontend/public/generated"

BRAND = (
    " Premium executive education aesthetic. Deep navy (#08131F) background with "
    "warm gold (#C9A227) accents and soft cream highlights. Cinematic, editorial, "
    "minimal, refined, no text, no logos, no human faces, ultra-realistic 4k render."
)

PROMPTS = {
    "strategic-leadership": (
        "Abstract hero image for an Advanced Program in Strategic Leadership — "
        "a single elegant gold chess knight piece illuminated on a dark navy "
        "marble surface, with delicate gold light filaments suggesting strategic "
        "pathways, soft volumetric haze, shallow depth of field." + BRAND
    ),
    "finance-non-finance": (
        "Abstract hero image for a Finance for Non-Finance Executives program — "
        "an upward-trending three-dimensional gold candlestick / line chart "
        "rendered as glowing geometry on a deep navy background, scattered subtle "
        "data points like constellations, cinematic light rays, refined and "
        "premium." + BRAND
    ),
}


async def gen(slug, prompt, attempt):
    api_key = os.environ["EMERGENT_LLM_KEY"]
    chat = LlmChat(
        api_key=api_key,
        session_id=f"epsilon-img-{slug}-retry-{attempt}",
        system_message="You are an image generation assistant.",
    )
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(
        modalities=["image", "text"]
    )
    _, images = await chat.send_message_multimodal_response(UserMessage(text=prompt))
    if images:
        out_path = os.path.join(OUT_DIR, f"{slug}.png")
        with open(out_path, "wb") as f:
            f.write(base64.b64decode(images[0]["data"]))
        return os.path.getsize(out_path)
    return 0


async def main():
    for slug, prompt in PROMPTS.items():
        for attempt in range(1, 5):
            try:
                size = await gen(slug, prompt, attempt)
                if size:
                    print(f"OK {slug}  ({size//1024} KB) on attempt {attempt}")
                    break
            except Exception as e:
                print(f"  attempt {attempt} {slug}: {str(e)[:120]}")
                await asyncio.sleep(3)


if __name__ == "__main__":
    asyncio.run(main())
