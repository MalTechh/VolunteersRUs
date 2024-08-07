
CREATE TABLE UserCredentials (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Email VARCHAR(100) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    Username VARCHAR(255) NOT NULL UNIQUE,
    UserType ENUM('Volunteer', 'Administrator') NOT NULL DEFAULT 'Volunteer', 
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) AUTO_INCREMENT=1000;


CREATE TABLE UserProfile (
    UserID INT PRIMARY KEY,
    FullName VARCHAR(50) NOT NULL,
    Address1 VARCHAR(100) NOT NULL,
    Address2 VARCHAR(100),
    City VARCHAR(100) NOT NULL,
    State VARCHAR(50) NOT NULL, 
    ZipCode VARCHAR(9) NOT NULL,
    Skills VARCHAR(255) NOT NULL,
    Preferences TEXT,
    Availability TEXT NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES UserCredentials(UserID)
);


CREATE TABLE EventDetails (
    EventID INT AUTO_INCREMENT PRIMARY KEY,
    EventName VARCHAR(100) NOT NULL,
    Description TEXT NOT NULL,
    Location TEXT NOT NULL,
    RequiredSkills VARCHAR(255) NOT NULL,
    Urgency ENUM('High', 'Medium', 'Low') NOT NULL,
    EventDate DATE NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) AUTO_INCREMENT=1000;


CREATE TABLE VolunteerHistory (
    ParticipationID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    EventID INT NOT NULL,
    ParticipationDate DATE NOT NULL,
    Status ENUM('Confirmed', 'Pending', 'Cancelled') NOT NULL DEFAULT 'Pending',
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES UserProfile(UserID),
    FOREIGN KEY (EventID) REFERENCES EventDetails(EventID)
) AUTO_INCREMENT=1000;


