
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

      var newTrain = {
          name: trainName,
          destination: trainDest,
          frequency: trainFrequency,
          first: firstTrain
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

    var row = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainFrequency),
    );

    $("#train-table > tbody").append(row);
    });