<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $json = file_get_contents("php://input"); // json string
    echo $json;

    $data = json_decode($json); // json object
    $firstname = $data->firstname;
    $lastname = $data->lastname;
    $email = $data->email;
    $phone = $data->phone;
    $message = $data->message;
    $submission_type = $data->submissionType;

    $to = "tl@towerlakes100.org";
    $subject = "New Upload Form Submission";
    $body = "Name: {$firstname} {$lastname}\nEmail: {$email}\nPhone: {$phone}\nMessage: {$message}\nSubmissionType: {$submission_type}";
    $headers = "From: {$email}";

    $success = mail($to, $subject, $body, $headers);

    if ($success) {
        echo "Message sent successfully!";
    } else {
        echo "Failed to send message.";
    }

}


// if (
//     !empty($_POST['firstname'])
//     && !empty($_POST['lastname'])
//     && !empty($_POST['email'])
//     && !empty($_POST['phone'])
//     && !empty($_POST['submissionType'])
// ) {
//     $firstname = $_POST["firstname"];
//     $lastname = $_POST["lastname"];
//     $email = $_POST["email"];
//     $phone = $_POST["phone"];
//     $message = $_POST["message"];
//     $submission_type = $_POST["submissionType"];


//     $to = "tl@towerlakes100.org";
//     $subject = "New Upload Form Submission";
//     $body = "Name: {$firstname} {$lastname}\nEmail: {$email}\nPhone: {$phone}\nMessage: {$message}\nSubmissionType: {$submission_type}";
//     $headers = "From: {$email}";

//     $success = mail($to, $subject, $body, $headers);

//     if ($success) {
//         echo "Message sent successfully!";
//     } else {
//         echo "Failed to send message.";
//     }
// }
