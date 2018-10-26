
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD_77_7vdJXKZEbcz_3t5LUS_qfYwHN-ws",
    authDomain: "train-schedule-b94cd.firebaseapp.com",
    databaseURL: "https://train-schedule-b94cd.firebaseio.com",
    projectId: "train-schedule-b94cd",
    storageBucket: "train-schedule-b94cd.appspot.com",
    messagingSenderId: "1070022817189"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train-btn").on("click", function (event) {
      event.preventDefault();

      var trainName = $("#train-input").val().trim();
      var trainDest = $("#destination-input").val().trim();
      var trainFrequency = $("#frequency-input").val().trim();
      var firstTrain = $("#first-train-input").val().trim();

      var timeConverted = moment(firstTrain,"HH:mm").subtract(1,"years");
        console.log(timeConverted);

      var currentTime = moment();
      console.log("Current: " + moment(currentTime).format("hh:mm"));

      var timeDiff = moment().diff(moment(timeConverted),"minutes");
      console.log("difference in time: " + timeDiff);

      var remainder = timeDiff % trainFrequency;
      console.log(remainder);

      var minsTill = trainFrequency - remainder;
      console.log("mins till train: " + minsTill);

      var nextTrain = moment().add(minsTill,"minutes");
      trainConverted = moment(nextTrain).format("HH:mm");
      console.log("Arrival time: " + trainConverted);



      var newTrain = {
          name: trainName,
          destination: trainDest,
          frequency: trainFrequency,
          first: firstTrain,
          minsTill: minsTill,
          next: trainConverted
      }

      database.ref().push(newTrain);

      console.log(newTrain.name);
      console.log(newTrain.destination);
      console.log(newTrain.frequency);
      console.log(newTrain.first);

      $("#train-input").val("");
      $("#destination-input").val("");
      $("#frequency-input").val("");
      $("#first-train-input").val("");
  });

    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());

        var trainName = childSnapshot.val().name;
        var trainDest = childSnapshot.val().destination;
        var trainFrequency = childSnapshot.val().frequency;
        var firstTrain = childSnapshot.val().first;
        var minsTill = childSnapshot.val().minsTill;
        var trainConverted = childSnapshot.val().next;

    var row = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainFrequency),
        $("<td>").text(trainConverted),
        $("<td>").text(minsTill),
        
    );

    $("#train-table > tbody").append(row);
    });