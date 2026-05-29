from pathlib import Path
from collections import deque

from PIL import Image


ROOT_DIR = Path(__file__).resolve().parents[1]
SOURCE_PATH = ROOT_DIR / "assets" / "source" / "monster-gallery.png"
OUTPUT_DIR = ROOT_DIR / "assets" / "monsters"

GRID_COLS = 3
GRID_ROWS = 4
OUTPUT_SIZE = 512
MAKE_TRANSPARENT = True
PAPER_THRESHOLD = 42

# Source image is a 3x4 illustrated codex sheet. These values intentionally
# live at the top so future concept sheets can be tuned without touching logic.
GRID_LEFT = 32
GRID_TOP = 246
CELL_W = 306
CELL_H = 306
CELL_GAP_X = 23
CELL_GAP_Y = 18

# Default crop avoids the vertical label plaque on the left of most cells.
DEFAULT_LEFT_INSET = 64
DEFAULT_RIGHT_INSET = 8
DEFAULT_TOP_INSET = 8
DEFAULT_BOTTOM_INSET = 14

# Optional per-monster tuning. Increase/decrease these if a tail, wing, horn,
# or label is still being clipped in a future source image.
MONSTERS = [
    {
        "file": "fox-demon.png",
        "row": 0,
        "col": 0,
        "left": 66,
        "right": 2,
        "top": 6,
        "bottom": 8,
    },
    {
        "file": "shrimp-demon.png",
        "row": 0,
        "col": 1,
        "left": 49,
        "right": 2,
        "top": 0,
        "bottom": 8,
    },
    {
        "file": "boar-dragon.png",
        "row": 0,
        "col": 2,
        "left": 62,
        "right": 4,
        "top": 0,
        "bottom": 8,
    },
    {
        "file": "frog-demon.png",
        "row": 1,
        "col": 0,
        "left": 66,
        "right": 2,
        "top": 10,
        "bottom": 6,
    },
    {
        "file": "lamp-granny.png",
        "row": 1,
        "col": 1,
        "left": 64,
        "right": 2,
        "top": 6,
        "bottom": 6,
    },
    {
        "file": "stone-armor.png",
        "row": 1,
        "col": 2,
        "left": 64,
        "right": 0,
        "top": 6,
        "bottom": 4,
    },
    {
        "file": "yaksha.png",
        "row": 2,
        "col": 0,
        "left": 64,
        "right": 0,
        "top": 0,
        "bottom": 4,
    },
    {
        "file": "wing-demon.png",
        "row": 2,
        "col": 1,
        "left": 48,
        "right": 0,
        "top": 4,
        "bottom": 10,
    },
    {
        "file": "bone-demon.png",
        "row": 2,
        "col": 2,
        "left": 64,
        "right": 0,
        "top": 4,
        "bottom": 6,
    },
    {
        "file": "bull-vanguard.png",
        "row": 3,
        "col": 0,
        "left": 58,
        "right": 0,
        "top": 0,
        "bottom": 2,
    },
    {
        "file": "water-dragon.png",
        "row": 3,
        "col": 1,
        "left": 18,
        "right": 0,
        "top": 0,
        "bottom": 0,
    },
    {
        "file": "yellow-robe-goblin.png",
        "row": 3,
        "col": 2,
        "left": 64,
        "right": 0,
        "top": 0,
        "bottom": 0,
    },
]


def cell_box(row, col, item):
    cell_x = GRID_LEFT + col * (CELL_W + CELL_GAP_X)
    cell_y = GRID_TOP + row * (CELL_H + CELL_GAP_Y)
    left = item.get("left", DEFAULT_LEFT_INSET)
    right = item.get("right", DEFAULT_RIGHT_INSET)
    top = item.get("top", DEFAULT_TOP_INSET)
    bottom = item.get("bottom", DEFAULT_BOTTOM_INSET)
    return (
        int(cell_x + left),
        int(cell_y + top),
        int(cell_x + CELL_W - right),
        int(cell_y + CELL_H - bottom),
    )


def fit_to_square(crop):
    crop = crop.convert("RGBA")
    canvas = Image.new("RGBA", (OUTPUT_SIZE, OUTPUT_SIZE), (245, 239, 222, 0 if MAKE_TRANSPARENT else 255))
    max_content = int(OUTPUT_SIZE * 0.92)
    scale = min(max_content / crop.width, max_content / crop.height)
    new_size = (max(1, int(crop.width * scale)), max(1, int(crop.height * scale)))
    crop = crop.resize(new_size, Image.Resampling.LANCZOS)
    x = (OUTPUT_SIZE - new_size[0]) // 2
    y = (OUTPUT_SIZE - new_size[1]) // 2
    canvas.alpha_composite(crop, (x, y))
    if MAKE_TRANSPARENT:
        remove_connected_paper(canvas)
    return canvas


def color_distance_sq(a, b):
    return sum((int(a[i]) - int(b[i])) ** 2 for i in range(3))


def remove_connected_paper(image):
    pixels = image.load()
    width, height = image.size
    corners = [
        pixels[0, 0],
        pixels[width - 1, 0],
        pixels[0, height - 1],
        pixels[width - 1, height - 1],
        pixels[width // 2, 0],
        pixels[width // 2, height - 1],
    ]
    bg = tuple(sum(c[i] for c in corners) // len(corners) for i in range(3))
    limit = PAPER_THRESHOLD * PAPER_THRESHOLD
    visited = set()
    queue = deque()

    for x in range(width):
        queue.append((x, 0))
        queue.append((x, height - 1))
    for y in range(height):
        queue.append((0, y))
        queue.append((width - 1, y))

    while queue:
        x, y = queue.popleft()
        if (x, y) in visited or not (0 <= x < width and 0 <= y < height):
            continue
        visited.add((x, y))
        r, g, b, a = pixels[x, y]
        if a == 0 or color_distance_sq((r, g, b), bg) <= limit:
            pixels[x, y] = (r, g, b, 0)
            queue.extend(((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)))


def main():
    if not SOURCE_PATH.exists():
        print(f"Source image not found: {SOURCE_PATH}")
        print("Please put the concept sheet at assets/source/monster-gallery.png")
        return 1

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    source = Image.open(SOURCE_PATH)
    print(f"Source: {SOURCE_PATH}")
    print(f"Size: {source.width}x{source.height}")

    for item in MONSTERS:
        box = cell_box(item["row"], item["col"], item)
        crop = source.crop(box)
        result = fit_to_square(crop)
        output_path = OUTPUT_DIR / item["file"]
        result.save(output_path, optimize=True)
        print(f"{output_path}  crop={box}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
