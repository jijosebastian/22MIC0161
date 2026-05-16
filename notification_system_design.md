# Notification System Design

## Stage 1
APIs:
- GET /notifications
- GET /notifications/priority?limit=10
- POST /notifications
- PATCH /notifications/:id/read

Header:
- Authorization: Bearer <token>

Real-time:
- WebSocket for instant updates

---

## Stage 2
DB: PostgreSQL

Tables:
- students
- notifications

Scaling:
- use indexing
- use caching

why postgreSqL:
- suppot ACID properties 
- reliable for structured notificatin data

query example :
- select * from notification WHERE event=Placement
---

## Stage 3
The query is logically correct but not optimized.

Issue:
- query slow due to full table scan
- filtering and sorting only after scanning all rows

Fix:
- create index on studentID, isRead, createdAt

Query for placement notification for last 7 days:
SELECT DISTINCT studentID FROM notifications
WHERE notificationType = 'Placement'
AND createdAt >= NOW() - INTERVAL '7 days';
---

## Stage 4
for Better Performance:
- caching :reduce DB load
- pagination :fetch limited records
- WebSocket : push notification instead of feching every time

---

## Stage 5
Problem:
- bulk notification is slow

Solution:
- use queue (RabbitMQ/Kafka)
- retry failed jobs

---

## Stage 6
Priority:
Placement > Result > Event

Sort by:
- priority
- latest time
