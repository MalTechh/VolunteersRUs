Run npm i start on the root folder

Make a .env file and include connection details or a url for a mysql db 

MySQL tables
------------------------------------------------------------------------------ 
CREATE TABLE UserCredentials (
  UserID int NOT NULL AUTO_INCREMENT,
  Email varchar(100) NOT NULL,
  PasswordHash varchar(255) NOT NULL,
  UserType enum('Volunteer', 'Administrator') NOT NULL DEFAULT 'Volunteer',
  CreatedAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  UpdatedAt timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  Username varchar(255) NOT NULL,
  PRIMARY KEY (UserID),
  UNIQUE KEY Email (Email),
  UNIQUE KEY Username (Username)
) ENGINE=InnoDB AUTO_INCREMENT=1078 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
what is this ENGINE=InnoDB AUTO_INCREMENT=1078 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `EventDetails` (
  `EventID` int NOT NULL AUTO_INCREMENT,
  `EventName` varchar(100) NOT NULL,
  `Description` text NOT NULL,
  `Location` text NOT NULL,
  `RequiredSkills` varchar(255) NOT NULL,
  `Urgency` enum('High', 'Medium', 'Low') NOT NULL,
  `EventDate` date NOT NULL,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`EventID`)
) ENGINE=InnoDB AUTO_INCREMENT=1018 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `UserProfile` (
  `UserID` int NOT NULL,
  `FullName` varchar(50) NOT NULL,
  `Address1` varchar(100) NOT NULL,
  `Address2` varchar(100) DEFAULT NULL,
  `City` varchar(100) NOT NULL,
  `State` varchar(50) NOT NULL,
  `ZipCode` varchar(9) NOT NULL,
  `Skills` varchar(255) NOT NULL,
  `Preferences` text,
  `Availability` text NOT NULL,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`UserID`),
  CONSTRAINT `userprofile_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `UserCredentials` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `VolunteerHistory` (
  `ParticipationID` int NOT NULL AUTO_INCREMENT,
  `UserID` int NOT NULL,
  `EventID` int NOT NULL,
  `ParticipationDate` date NOT NULL,
  `Status` enum('Confirmed', 'Pending', 'Cancelled') NOT NULL DEFAULT 'Pending',
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ParticipationID`),
  KEY `UserID` (`UserID`),
  KEY `EventID` (`EventID`),
  CONSTRAINT `volunteerhistory_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `UserProfile` (`UserID`),
  CONSTRAINT `volunteerhistory_ibfk_2` FOREIGN KEY (`EventID`) REFERENCES `EventDetails` (`EventID`)
) ENGINE=InnoDB AUTO_INCREMENT=1016 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `message` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

