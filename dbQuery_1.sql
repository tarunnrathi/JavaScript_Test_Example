
USE [testDB]
-- CREATE table Emp(
--     EMPID INT PRIMARY KEY,
--     EMPNAME VARCHAR(100),
--     DOB VARCHAR(100)
-- );

-- INSERT INTO [dbo].[Emp] VALUES (1,'Tarun','1/9/1984');

SELECT * from [testDB].[dbo].[Emp];
INSERT INTO [testDB].[dbo].[Emp] VALUES (2,'Ritika','1/9/1984');

INSERT INTO [testDB].[dbo].[Emp] VALUES (3,'Naresh','1/9/1984');
INSERT INTO [testDB].[dbo].[Emp] VALUES (4,'Minakshi','1/9/1984');
INSERT INTO [testDB].[dbo].[Emp] VALUES (5,'Ruchi','1/9/1984');
INSERT INTO [testDB].[dbo].[Emp] VALUES (6,'Yogesh','1/9/1984');
INSERT INTO [testDB].[dbo].[Emp] VALUES (7,'Tejas','1/9/1984');


CREATE table Salary(
    SALID INT PRIMARY KEY,
    EMPID INT,
    SAL_AMT INT,
    SAL_MONTH VARCHAR(100),
    SAL_YEAR VARCHAR(100)
);

INSERT INTO [dbo].[Salary] VALUES (1,1,2000,'Jan','2021');
INSERT INTO [dbo].[Salary] VALUES (2,1,2000,'Feb','2021');
INSERT INTO [dbo].[Salary] VALUES (3,1,2000,'Mar','2021');
INSERT INTO [dbo].[Salary] VALUES (4,1,2000,'April','2021');

INSERT INTO [dbo].[Salary] VALUES (5,2,3000,'Jan','2021');
INSERT INTO [dbo].[Salary] VALUES (6,2,3000,'Feb','2021');
INSERT INTO [dbo].[Salary] VALUES (7,2,3000,'Mar','2021');
INSERT INTO [dbo].[Salary] VALUES (8,2,3000,'April','2021');

INSERT INTO [dbo].[Salary] VALUES (9,3,4000,'Jan','2021');
INSERT INTO [dbo].[Salary] VALUES (10,3,4000,'Feb','2021');
INSERT INTO [dbo].[Salary] VALUES (11,3,4000,'Mar','2021');
INSERT INTO [dbo].[Salary] VALUES (12,3,4000,'April','2021');


INSERT INTO [dbo].[Salary] VALUES (13,4,5000,'Jan','2021');
INSERT INTO [dbo].[Salary] VALUES (14,4,5000,'Feb','2021');
INSERT INTO [dbo].[Salary] VALUES (15,4,5000,'Mar','2021');
INSERT INTO [dbo].[Salary] VALUES (16,4,5000,'April','2021');


INSERT INTO [dbo].[Salary] VALUES (17,5,2000,'Jan','2021');
INSERT INTO [dbo].[Salary] VALUES (18,5,2000,'Feb','2021');
INSERT INTO [dbo].[Salary] VALUES (19,5,2000,'Mar','2021');
INSERT INTO [dbo].[Salary] VALUES (20,5,2000,'April','2021');


INSERT INTO [dbo].[Salary] VALUES (21,6,4000,'Jan','2021');
INSERT INTO [dbo].[Salary] VALUES (22,6,4000,'Feb','2021');
INSERT INTO [dbo].[Salary] VALUES (23,6,4000,'Mar','2021');
INSERT INTO [dbo].[Salary] VALUES (24,6,4000,'April','2021');


SELECT * from [testDB].[dbo].[Emp];

SELECT * from [testDB].[dbo].[Salary];

SELECT e.EMPNAME,s.SAL_AMT
from [testDB].[dbo].[Emp] e
JOIN [testDB].[dbo].[Salary] s
on e.EMPID = s.EMPID
WHERE s.SAL_MONTH='Mar' and s.SAL_YEAR='2021'
ORDER by s.SAL_AMT desc

SELECT * 
FROM(
SELECT e.EMPNAME,s.SAL_AMT,dense_rank()
over(order by s.SAL_AMT desc )Rank_no
from [testDB].[dbo].[Emp] e
JOIN [testDB].[dbo].[Salary] s
on e.EMPID = s.EMPID
WHERE s.SAL_MONTH='Mar' and s.SAL_YEAR='2021'
)T
WHERE T.Rank_no=4


SELECT * 
FROM(
SELECT e.EMPNAME,s.SAL_AMT,rank()
over(order by s.SAL_AMT desc )Rank_no
from [testDB].[dbo].[Emp] e
JOIN [testDB].[dbo].[Salary] s
on e.EMPID = s.EMPID
WHERE s.SAL_MONTH='Mar' and s.SAL_YEAR='2021'
)T
WHERE T.Rank_no=4


SELECT E.EMPID,EMPNAME,S.SAL_AMT,S.SAL_MONTH,
Rank() OVER(ORDER BY S.SAL_AMT desc) Rank_No
FROM [testDB].[dbo].[Emp] E
JOIN [testDB].[dbo].[Salary] S
ON E.EMPID=S.EMPID
WHERE S.SAL_MONTH='Mar' and S.SAL_YEAR='2021'

SELECT *
FROM(
SELECT E.EMPID,EMPNAME,S.SAL_AMT,S.SAL_MONTH,
dense_rank() OVER(ORDER BY S.SAL_AMT desc) Rank_No
FROM [testDB].[dbo].[Emp] E
JOIN [testDB].[dbo].[Salary] S
ON E.EMPID=S.EMPID
WHERE S.SAL_MONTH='Mar' and S.SAL_YEAR='2021'
)T
WHERE T.Rank_No=3

-- cte

WITH New_CTE(Number,Second_Number)
AS
(
    SELECT 1 AS Number,2 AS Second_Number
UNION ALL
SELECT c.Number+1,c.Second_Number
FROM New_CTE c
)
SELECT e.Number,e.Second_Number
FROM New_CTE e
-- cte
GO

select * from [testDB].[dbo].[Emp]

USE [testDB]
GO

CREATE TRIGGER trInsertEmployee   
ON [testDB].[dbo].[Emp]
AFTER INSERT  
AS  
BEGIN  
PRINT('Record(s) inserted successfully')
END  
------------------------------------------------------
USE [tempdb]


CREATE TABLE Player(
    Player_No INT,
    Name CHAR(200)
)

CREATE TABLE Scores(
    Player_No INT,
    Sport CHAR(200),
    Score INT
)

INSERT INTO Player VALUES(1,'Alger')
INSERT INTO Player VALUES(2,'Lang')
INSERT INTO Player VALUES(3,'Alger')

select * from Player
INSERT INTO Scores VALUES(1,'Chess',16)
INSERT INTO Scores VALUES(1,'Swimming',14)
INSERT INTO Scores VALUES(2,'Chess',15)
INSERT INTO Scores VALUES(3,'Swimming',16)
INSERT INTO Scores VALUES(2,'Sprint',13)
INSERT INTO Scores VALUES(3,'Chess',16)

select * from Scores

SELECT A.Name,SUM(b.Score)
FROM Player A,Scores B
WHERE A.Player_No = B.Player_No
GROUP by A.Name

CREATE TABLE Votes(
    Ward_No INT,
    Street_Name CHAR(200),
    Vote_Count INT
)

INSERT INTO Votes VALUES(1,'Park',20)
INSERT INTO Votes VALUES(1,'Main',10)
INSERT INTO Votes VALUES(2,'Main',10)
INSERT INTO Votes VALUES(3,'Main',20)
INSERT INTO Votes VALUES(1,'Cross',10)
INSERT INTO Votes VALUES(2,'Cross',20)
INSERT INTO Votes VALUES(1,'Wall',10)

select * from Votes

GO

WITH total(Name,Vote_Count)
AS
SELECT Street_Name,SUM(Vote_Count)
FROM Votes
GROUP BY Street_Name
WITH total_avg(Vote_Count)
AS
SELECT AVG(Vote_Count)
FROM total
SELECT Name
FROM total

------------- how to write TWO CTE -----------------
-- here Vote_Count is >= AVG(Vote_Count)

;WITH total(Name,Vote_Count)
AS
(
SELECT Street_Name,SUM(Vote_Count)
FROM Votes
GROUP BY Street_Name
),
total_avg(Vote_Count)
AS
(
SELECT AVG(Vote_Count)
FROM total
)
SELECT total.Name,total.Vote_Count
FROM total,total_avg
WHERE total.Vote_Count >= total_avg.Vote_Count





