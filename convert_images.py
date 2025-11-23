import os
import json
from PIL import Image
try:
    from pillow_heif import register_heif_opener
    register_heif_opener()
    HEIF_SUPPORT = True
except ImportError:
    HEIF_SUPPORT = False
    print("pillow-heif not installed. HEIC conversion will be skipped.")

def convert_images():
    pics_dir = 'pics'
    valid_images = []
    
    for filename in os.listdir(pics_dir):
        filepath = os.path.join(pics_dir, filename)
        name, ext = os.path.splitext(filename)
        ext = ext.lower()
        
        if ext in ['.heic', '.heif']:
            if HEIF_SUPPORT:
                try:
                    img = Image.open(filepath)
                    new_filename = name + ".jpg"
                    new_filepath = os.path.join(pics_dir, new_filename)
                    img.save(new_filepath, "JPEG")
                    print(f"Converted {filename} to {new_filename}")
                    valid_images.append(new_filename)
                except Exception as e:
                    print(f"Failed to convert {filename}: {e}")
            else:
                print(f"Skipping {filename} (no HEIC support)")
        elif ext in ['.jpg', '.jpeg', '.png', '.gif', '.webp']:
            valid_images.append(filename)
            
    return valid_images

def main():
    images = convert_images()
    
    with open('images.js', 'w') as f:
        f.write(f"const backgroundImages = {json.dumps(images, indent=4)};\n")
        f.write("export default backgroundImages;")

if __name__ == "__main__":
    main()
