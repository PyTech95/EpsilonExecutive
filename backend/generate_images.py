"""Generate hero (Indian online learner) and Applied AI/ML program image via Nano Banana."""
import asyncio
import os
import base64
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv("/app/backend/.env")

OUT_DIR = "/app/frontend/public/generated"
os.makedirs(OUT_DIR, exist_ok=True)

PROMPTS = {
    "hero-indian-online-learner": (
        "Photorealistic cinematic photograph of an Indian working professional "
        "(age between 25 and 40, smart-casual attire, focused expression) doing "
        "online study at home — sitting at a wooden desk in a softly lit modern "
        "Indian apartment, looking attentively at a laptop screen with a faint "
        "video-call interface visible, wearing slim headphones, an open notebook "
        "and a cup of chai beside the laptop, warm golden evening light from a "
        "window, shallow depth of field, candid editorial style, premium executive "
        "education aesthetic, dark navy and cream tones in the background, no text, "
        "no logos, ultra-realistic, 4k."
    ),
    "applied-ai-ml": (
        "Abstract premium hero photograph for an Applied AI and Machine Learning "
        "executive program — a glowing 3D neural network of luminous gold and "
        "soft amber nodes connected by delicate light filaments, set against a "
        "deep navy almost black background with subtle starfield, minimal "
        "depth-of-field, cinematic, refined, editorial, no text, no logos, no "
        "human faces, premium luxury feel, ultra-realistic 4k render."
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
        msg = UserMessage(text=prompt)
        try:
            _, images = await chat.send_message_multimodal_response(msg)
        except Exception as e:
            print(f"  ERROR: {e}")
            continue
        if not images:
            print(f"  no images returned for {slug}")
            continue
        out_path = os.path.join(OUT_DIR, f"{slug}.png")
        with open(out_path, "wb") as f:
            f.write(base64.b64decode(images[0]["data"]))
        print(f"  saved {out_path} ({os.path.getsize(out_path)//1024} KB)")


if __name__ == "__main__":
    asyncio.run(main())
