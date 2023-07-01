# sesg-web

> Web interface visualize the results obtained with SeSG.

## Installation

Clone the repository, and install the dependencies with `npm install`.

## Usage

Create a `.env` file with the following variables:

> You can use the `.env.example` file as a template.

- **DATABASE_URL**: URL of the database with SeSG results.

Run `npx prisma db pull` to create a `prisma/schema.prisma` file. Then, run `npx prisma generate` to generate the Prisma client.

Finally, run `npm run dev` to start the development server.

## Features

### Data tables

> Highly dynamic data tables to sort, filter and paginate over the database rows.

Click on the header of a column to sort the table by that column. Click again to reverse the order. The third click will remove that column of the sorting. You can sort by multiple columns at the same time.

Use the search bar to enter a where clause to filter the table. Enter only the conditions, without the `WHERE` statement.

Use the pagination buttons to navigate through the table.
