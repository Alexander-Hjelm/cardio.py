import random
import time
import winsound

def progress_bar(duration):
    start_time = time.time()
    end_time = start_time + duration

    while time.time() < end_time:
        elapsed_time = time.time() - start_time
        progress = elapsed_time / duration
        progress_percent = int(progress * 100)

        # Update the progress bar
        progress_bar = "[" + "#" * (progress_percent // 10) + " " * ((100 - progress_percent) // 10) + "]"
        print(f"\r{progress_bar} {progress_percent}% Complete", end="")

        time.sleep(0.1)  # Update the progress bar every 0.1 seconds
    
    print("\n")

frequency = 2500  # Set Frequency To 2500 Hertz
duration = 1000  # Set Duration To 1000 ms == 1 second

def beep(frequency, duration):
    winsound.Beep(frequency, duration)

def print_exerise(current, next):
    output = current
    if next:
        output += " --------- next: " + next
    print(output)

light_exercises = [
    "High knee twists",
    "Back turns",
    "Arm circles",
    "Jumping oblique twists",
    "Running in place"
]

medium_exercises = [
    "Jumping jacks",
    "Mountain climbers",
    "Screamer lunges",
    "Burpees",
    "Inchworms",
    "Squat jumps",
    "Star jumps",
    "Plank jacks",
    "Squat jacks",
    "Side leg raise",
    "Ski hops",
    "Plank"
]

sets = int(input("Enter the number of sets: (3 min each) "))

print("Workout Program:")
print("---------------")

# Warmup set
print("Warmup Set:")
light_exercises_sample = random.sample(light_exercises, 5)
for i in range(0,5):
    current = light_exercises_sample[i]
    next = None
    if i<4:
         next = light_exercises_sample[i+1]
    print_exerise(current, next)
    beep(2000, 1200)
    progress_bar(30)  # 30 seconds per exercise

# Rest between sets
print("Rest for 30 seconds")
beep(1600, 2500)
progress_bar(30)  # Rest for 30 seconds

# Generate workout sets
for i in range(1, sets + 1):
    print(f"Set {i}:")

    exercises_sample = random.sample(light_exercises + medium_exercises, 5)
    for i in range(0,5):
        current = exercises_sample[i]
        next = None
        if i<4:
            next = exercises_sample[i+1]
        print_exerise(current, next)

        beep(2000, 1200)
        progress_bar(30)  # 30 seconds per exercise

    # Rest between sets
    if i < sets:
        print("Rest for 30 seconds")
        beep(1600, 2500)
        progress_bar(30)  # Rest for 30 seconds
