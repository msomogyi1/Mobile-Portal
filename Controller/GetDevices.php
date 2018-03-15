<?php
$response = '{
    "Devices": [
        {
            "Udid": "699975c7f9593a5605b298dff19492cbc59de72a",
            "SerialNumber": "DMPV7098HPDY",
            "MacAddress": "787B8A5D4304",
            "Imei": "355819081624714",
            "EasId": "DKEIL4AMLP6EN8N4DS0P4T9R7C",
            "AssetNumber": "",
            "DeviceFriendlyName": "msomogyi iPad iOS 11.2.2 HPDY",
            "LocationGroupId": {
                "Id": {
                    "Value": 2661
                },
                "Uuid": "89699877-5e16-44cb-a949-19f1d5f9d8e4",
                "Name": "DEP"
            },
            "LocationGroupName": "DEP",
            "UserId": {
                "Id": {
                    "Value": 217613
                },
                "Uuid": "92278786-9108-4715-85ca-136231e13f4f",
                "Name": "Matthew Somogyi"
            },
            "UserName": "msomogyi",
            "UserEmailAddress": "msomogyi@ITS.JNJ.com",
            "Ownership": "C",
            "PlatformId": {
                "Id": {
                    "Value": 2
                },
                "Name": "Apple"
            },
            "Platform": "Apple",
            "ModelId": {
                "Id": {
                    "Value": 2
                },
                "Name": "iPad Pro with Wi-Fi + Cellular (10.5-inch)(256 GB Rose Gold)"
            },
            "Model": "iPad Pro with Wi-Fi + Cellular (10.5-inch)(256 GB Rose Gold)",
            "OperatingSystem": "11.2.2",
            "PhoneNumber": "",
            "LastSeen": "2018-03-15T08:08:09.460",
            "EnrollmentStatus": "Enrolled",
            "ComplianceStatus": "PendingComplianceCheck",
            "CompromisedStatus": false,
            "LastEnrolledOn": "2018-03-06T16:49:28.780",
            "LastComplianceCheckOn": "0001-01-01T00:00:00.000",
            "LastCompromisedCheckOn": "2018-02-22T18:59:22.113",
            "IsSupervised": true,
            "DeviceMCC": {
                "SIMMCC": "310",
                "CurrentMCC": ""
            },
            "VirtualMemory": 0,
            "DeviceCapacity": 252531818496,
            "AvailableDeviceCapacity": 249969016832,
            "IsDeviceDNDEnabled": false,
            "IsDeviceLocatorEnabled": false,
            "IsCloudBackupEnabled": false,
            "IsActivationLockEnabled": false,
            "IsNetworkTethered": false,
            "IsRoaming": false,
            "SystemIntegrityProtectionEnabled": false,
            "ProcessorArchitecture": 0,
            "Id": {
                "Value": 362508
            },
            "Uuid": "163dafa2-9751-4db8-972b-803c9d9564e3"
        },
        {
            "Udid": "a9ea6d7c14ebd3d5f2544a9be0edca24",
            "SerialNumber": "R38J80JVS8T",
            "MacAddress": "B8D7AF099D68",
            "Imei": "358071081351917",
            "EasId": "AirWatch615960692",
            "AssetNumber": "",
            "DeviceFriendlyName": "msomogyi Android Android 7.1.1 VS8T",
            "LocationGroupId": {
                "Id": {
                    "Value": 2608
                },
                "Uuid": "fb58a1db-6c34-4695-b7fd-a360b2fb405e",
                "Name": "Managed"
            },
            "LocationGroupName": "Managed",
            "UserId": {
                "Id": {
                    "Value": 217613
                },
                "Uuid": "92278786-9108-4715-85ca-136231e13f4f",
                "Name": "Matthew Somogyi"
            },
            "UserName": "msomogyi",
            "UserEmailAddress": "msomogyi@ITS.JNJ.com",
            "Ownership": "C",
            "PlatformId": {
                "Id": {
                    "Value": 5
                },
                "Name": "Android"
            },
            "Platform": "Android",
            "ModelId": {
                "Id": {
                    "Value": 5
                },
                "Name": "samsung SM-N950U"
            },
            "Model": "samsung SM-N950U",
            "OperatingSystem": "7.1.1",
            "PhoneNumber": "2159414023",
            "LastSeen": "2018-03-15T17:15:03.253",
            "EnrollmentStatus": "Enrolled",
            "ComplianceStatus": "Compliant",
            "CompromisedStatus": false,
            "LastEnrolledOn": "2018-03-09T16:42:44.987",
            "LastComplianceCheckOn": "2018-03-09T16:42:49.183",
            "LastCompromisedCheckOn": "2018-03-15T16:59:46.437",
            "IsSupervised": false,
            "DeviceMCC": {
                "SIMMCC": "311",
                "CurrentMCC": "0"
            },
            "VirtualMemory": 0,
            "IsDeviceDNDEnabled": false,
            "IsDeviceLocatorEnabled": false,
            "IsCloudBackupEnabled": false,
            "IsActivationLockEnabled": false,
            "IsNetworkTethered": false,
            "IsRoaming": false,
            "SystemIntegrityProtectionEnabled": false,
            "ProcessorArchitecture": 0,
            "Id": {
                "Value": 371650
            },
            "Uuid": "2a1d9c63-7e8c-417e-b136-f33ff19c5ae9"
        }
    ],
    "Page": 0,
    "PageSize": 500,
    "Total": 2
}';

echo $response;