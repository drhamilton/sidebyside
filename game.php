<?php

$db = new mysqli('db487023807.db.1and1.com', 'dbo487023807', 'southfirst', 'db487023807');

if($db->connect_errno > 0){
    die('Unable to connect to database [' . $db->connect_error . ']');
}

$category = $_POST['category'];
$value = $_POST['value'];
$category2 = $_POST['category2'];
$value2 = $_POST['value2'];

$sql = <<<SQL
SELECT 
	year_founded, 
	zip, 
	num_projects, 
	culture_drink_of_choice, 
	revenue, 
	culture_noise, 
	space_chair_type, 
	space_satisfaction, 
	space_which_floor, 
	other_studio_decorations, 
	staff_age, 
	studio_square_footage, 
	address_geo_lat, 
	address_geo_lng
FROM 
	`img_studios`
WHERE 
	$category LIKE '$value'
AND 
	$category2 LIKE '$value2'
AND
	staff_age <> ''
AND
	revenue <> ''
SQL;

if(!$result = $db->query($sql)){
    die('There was an error running the query [' . $db->error . ']');
}

/*
echo 'Total studios matched: ' . $result->num_rows;

echo "<table>";
*/
//echo "<thead><td>Year Founded</td><td>Zip Code</td><td>Number of Projects</td><td>Drink of Choice</td><td>Noise Level</td><td>Revenue</td><td>Chair Type</td><td>Space Satisfaction</td><td>Floor Level</td><td>Studio Decorations</td><td>Age</td><td>Square Footage</td><td>Latitude</td><td>Longitude</td>";
while($row = $result->fetch_assoc()){
	/*
	echo '<tr>';
    echo '<td>' . $row['year_founded'] . '</td>';
    echo '<td>' . $row['zip'] . '</td>';
    echo '<td>' . $row['num_projects'] . '</td>';
    echo '<td>' . $row['culture_drink_of_choice'] . '</td>';
    echo '<td>' . $row['culture_noise'] . '</td>';
    echo '<td>' . $row['revenue'] . '</td>';
    echo '<td>' . $row['space_chair_type'] . '</td>';
    echo '<td>' . $row['space_satisfaction'] . '</td>';
    echo '<td>' . $row['space_which_floor'] . '</td>';
    echo '<td>' . $row['other_studio_decorations'] . '</td>';
    echo '<td>' . $row['studio_square_footage'] . '</td>';
    */
    $result_array['age'][] = $row['staff_age'];
    $result_array['revenue'][] = $row['revenue'];
    $result_array['lat'][] = $row['address_geo_lat'];
    $result_array['lng'][] = $row['address_geo_lng'];
    //echo '</tr>';
}
//echo "</table>";
//echo "<br />";
if (count($result_array) > 0) {
	echo json_encode($result_array);
}
else {
	echo 0;
}
	
$db->close();	
	
?>