import icon from './icon.png';
import './App.css';
import React from 'react';
import BeepAudio from './beep.wav'
import LowBeepAudio from './lowbeep.wav'

class App extends React.Component {

  intervalSeconds = 30;
  exercisesPerSet = 5;

  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.submitForm = this.submitForm.bind(this);
  }

  light_exercises = [
    "High knee twists",
    "Back turns",
    "Arm circles",
    "Jumping oblique twists",
    "Running in place",
    "Arm crossovers",
    "Body rotations",
    "Hip swirls",
    "Lateral steps",
    "Leg kicks",
    "Overhead reach",
    "Side bends"
  ];
  
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
    "Plank",
    "Lateral step reach",
    "Jackknives",
    "Knee pushups"
  ];

  submitForm() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
    let sets = parseInt(document.getElementById("setsInput").value);
    this.doExercise(sets);
    this.hide_form();
    this.show_exercise_menu();
  }

  async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  print_exercise(current, next) {
    document.getElementById("currentExercise").textContent = "Current exercise: " + current;
    document.getElementById("nextExercise").textContent = "Next exercise: " + next;
  }

  hide_form() {
    document.getElementById("myForm").style.display = "none";
  }

  show_form() {
    document.getElementById("myForm").style.display = "block";
  }

  hide_exercise_menu() {
    document.getElementById("exerciseMenu").style.display = "none";
  }

  show_exercise_menu() {
    document.getElementById("exerciseMenu").style.display = "block";
  }

  async progress_bar(duration) {
    const durationMS = duration*1000;
    const start_time = Date.now();
    const end_time = start_time + durationMS;
  
    let progressBarInner = document.getElementById("progressBarInner");
    let width = 0;

    while (Date.now() < end_time) {
      const elapsed_time = Date.now() - start_time;
      const progress = elapsed_time / durationMS;
      const progress_percent = progress * 100;
  
      // Update the progress bar
      width = width + 1;
      progressBarInner.style.width = progress_percent + "%";
  
      await this.sleep(50); // Update the progress bar every 0.05 seconds
    }
  }  

  beep() {
    // Play sound (implementation specific)
    var AudioPlay = new Audio (BeepAudio);
    AudioPlay.play();
  }

  lowBeep() {
    // Play sound (implementation specific)
    var AudioPlay = new Audio (LowBeepAudio);
    AudioPlay.play();
  }

  async doExercise(sets) {
    // Warmup set
    const light_exercises_sample = this.light_exercises.sort(() => Math.random() - 0.5).slice(0, 5);
    for (let i = 0; i < this.exercisesPerSet; i++) {
      const current = light_exercises_sample[i];
      let next = i < 4 ? light_exercises_sample[i + 1] : null;
      if(next == null) {
        next = "Break"
      }
      this.print_exercise(current, next);
      this.beep();
      await this.progress_bar(this.intervalSeconds); // 30 seconds per exercise
    }

    // Rest between sets
    this.print_exercise("Break", "");
    this.lowBeep();
    await this.progress_bar(this.intervalSeconds); // Rest for 30 seconds

    // Generate workout sets
    for (let i = 1; i <= sets; i++) {
      const exercises_sample = this.light_exercises.concat(this.medium_exercises)
        .sort(() => Math.random() - 0.5).slice(0, 5);
      for (let j = 0; j < this.exercisesPerSet; j++) {
        const current = exercises_sample[j];
        let next = j < 4 ? exercises_sample[j + 1] : null;
        if(next == null) {
          next = "Break"
        }
        this.print_exercise(current, next);

        this.beep();
        await this.progress_bar(this.intervalSeconds); // 30 seconds per exercise
      }

      // Rest between sets
      if (i < sets) {
        this.print_exercise("Break", "");
        this.lowBeep();
        await this.progress_bar(this.intervalSeconds); // Rest for 30 seconds
      }
    }

    this.hide_exercise_menu();
    this.show_form();
  }

  componentDidMount() {
    this.hide_exercise_menu();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={icon} className="App-icon" alt="logo" />
          <form id="myForm">
            <label for="setsIpnut">Enter the number of sets:</label>
            <br></br>
            <input type="number" id="setsInput" name="setsInput" required></input>
            <br></br>
            <button type="button" onClick={this.submitForm}>Submit</button>
          </form>
          <div id="exerciseMenu">
            <h2 id="currentExercise">Current exercise: </h2>
            <span id="nextExercise">Next exercise: </span>
            <br></br>
            <br></br>
            <h3 id="timeLeft">Time left:</h3>
            <div id="progressBar">
              <div id="progressBarInner"></div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
