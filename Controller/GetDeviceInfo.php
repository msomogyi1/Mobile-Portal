<?php
$response = '{
    "DeviceId": {
        "Id": {
            "Value": 371650
        }
    },
    "DeviceProfiles": [
        {
            "Status": 6,
            "Name": "Sample Email",
            "Description": "Sample Email Profile",
            "LocationGroupId": {
                "Id": {
                    "Value": 79122
                }
            },
            "CurrentVersion": 3,
            "AssignmentType": 3,
            "Id": {
                "Value": 79122
            }
        }
    ],
    "Page": 0,
    "PageSize": 500,
    "Total": 25
}'

$second_response = '{
    "DeviceId": {
        "Id": {
            "Value": 371650
        }
    },
    "DeviceApps": [
        {
            "Status": 6,
            "Name": "Sample Email",
            "Description": "Sample Email Profile",
            "LocationGroupId": {
                "Id": {
                    "Value": 79122
                }
            },
            "CurrentVersion": 3,
            "AssignmentType": 3,
            "Id": {
                "Value": 79122
            }
        }
    ],
    "Page": 0,
    "PageSize": 500,
    "Total": 25
}'

curl_close($curl);
if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response."this-is-the-seperator".$second_response;
}