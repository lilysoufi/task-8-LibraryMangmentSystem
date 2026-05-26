##  Library Management System


1.  **Actors** — Who uses the system?

- member

- manager

- librarian

  

2.  **Main actions** — What do they do?

- Show Libraries

- Browse all the library material

- Member reserves material that are not currently available

- Member makes a material loan

- Member returns borrowed material

- Member writes a Feedback ( review )

- Librarians records a loan

- Librarians records a return

  

3.  **Find the nouns** — Each important noun often becomes a **collection**

- User : has two discriminators (Member , Librarians)

- Library 

- Material :  has two discriminators (Books , Magazines , ..)

- Loan

- Reservation

- Review

  

4.  **Relationships**

- Library (1) => (M) Sections

- Section (1) => (M) Materials

- User `Member` (1) => (M) Loans

- User `Member` (1) => (M) Reservations

- User `Member` (1) => (M) Review

- User `Librarian` (1) => (M) Materials

- User `Librarian` (1) => (M) Loans

- Materials (M) => (M) Loans

- Library (1) -> (M) Review

- Material (1) -> (1) Review

  

5.  **Name fields by role**

  ```
User {

name , phone , registeredAt , passoword
}
```

```
Member {
address?, dateOfBirth?, membershipNumber?
}
```
```
Librarian {
officeLocation?, responsibleDepartment ,hireDate
}

```
  

 ``` Library {

name, desc, photo, location, address, hoursWork, avgRate

}
```

  

```Materials {

type :  title,  publisher,totalCopies, availableCopies, reservedCopies , coverImageUrl

}
```

```
Books {
author , category , ISBN , publicationYear 
}
```

```
Magazines {
issueNumber , month , year , volume , ISSN , editor , frequency
}
```

``` Loans {

loanDate, dueDate, actualReturnDate?, status (active | returned | overdue | cancelled). Fines: finePerDay,totalFineDays , totalFineAmount, paymentStatus (paid | unpaid)

memberId (Ref : User)

materialId (Ref : Material)

employeeId (Librarian who recorded the loan ) (REf : User)

}

```

  

``` Reservstion {

materialId (Ref : Material )

, memberId ( Ref : User )

, reservedAt, queuePriority, notifiedWhenAvailable, autoCancelAfter (duration or date rule).

}
```

  

```
Review {

membersId ( Ref : User ),

materialId ( Ref : Material ),

rate (1-5 stars) , comment?.

}
```
