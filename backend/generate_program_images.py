"""Generate matching on-brand program images via Nano Banana."""
import asyncio
import os
import base64
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv("/app/backend/.env")
OUT_DIR = "/app/frontend/public/generated"
os.makedirs(OUT_DIR, exist_ok=True)

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
    "digital-transformation": (
        "Abstract hero image for a Digital Transformation program — an elegant "
        "isometric architecture of glowing gold interconnected blocks and bridges "
        "dissolving into light particles on a deep navy background, suggesting "
        "modern operating systems being rebuilt, cinematic and refined." + BRAND
    ),
}


async def main():
    api_key = os.environ["EMERGENT_LLM_KEY"]
    for slug, prompt in PROMPTS.items():
        print(f"→ Generating {slug} ...")
        chat = LlmChat(
            api_key=api_key,
            session_id=f"epsilon-img-{slug}",
            system_message="You are an image generation assistant.",
        )
        chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(
            modalities=["image", "text"]
        )
        try:
            _, images = await chat.send_message_multimodal_response(UserMessage(text=prompt))
        except Exception as e:
            print(f"  ERROR: {e}")
            continue
        if not images:
            print(f"  no images for {slug}")
            continue
        out_path = os.path.join(OUT_DIR, f"{slug}.png")
        with open(out_path, "wb") as f:
            f.write(base64.b64decode(images[0]["data"]))
        print(f"  saved {out_path} ({os.path.getsize(out_path)//1024} KB)")


if __name__ == "__main__":
    asyncio.run(main())
