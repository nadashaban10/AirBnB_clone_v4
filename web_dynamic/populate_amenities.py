import sys
import os

# Add parent directory to Python path
current_dir = os.path.dirname(os.path.realpath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.append(parent_dir)

try:
    from faker import Faker
    from models import storage
    from models.amenity import Amenity
except ImportError as e:
    print("Error importing module:", e)
    sys.exit(1)

def populate_amenities(num_amenities):
    fake = Faker()
    for _ in range(num_amenities):
        amenity = Amenity(name=fake.word())
        storage.new(amenity)
    storage.save()

if __name__ == "__main__":
    num_amenities = 10  # Specify the number of amenities to generate
    populate_amenities(num_amenities)
