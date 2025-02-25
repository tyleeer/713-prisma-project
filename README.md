# 713-prisma-project

## Database design

- Books (id, title, isbn, authorId, bookCategories[], borrowingDetails[])
- Categories (id, categoryName, bookCategories[])
- BookCategories (bookId, categoryId)
- Authors (id, firstName, lastName, organizationId, books[])
- Organizations (id, organizationName, authors[])
- Members (id, memberCode, firstName, lastName, phone, borrowings[])
- Borrowings (id, memberId, borrowDate, borrowingDetails[])
- BorrowingDetails (id, borrowingId, bookId, dueDate, returnDate)
