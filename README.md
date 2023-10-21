# Node.js Express API

This project is a robust backend API built with Node.js and Express. It integrates the power of Prisma to offer a seamless database management experience.
## Setup Instructions

### Prerequisites

1. **[Node.js 16.x+](https://nodejs.org/)**: Ensure that Node.js version 16.x+ is installed.
2. **[Yarn](https://classic.yarnpkg.com/en/docs/install/)**: This project utilizes Yarn for package management.
3. **[Docker](https://www.docker.com/get-started)** and **[Docker-Compose](https://docs.docker.com/compose/install/)**: Used for setting up and managing your development environment.

### Installation and Configuration

1. Clone the repository to your local machine.
2. Navigate to the project directory and run the following to install the project dependencies:
    ```bash
    yarn install
    ```
3. Fire up the necessary Docker containers using:
    ```bash
    docker-compose up -d
    ```
4. With **[Prisma](https://www.prisma.io/docs/)**, generate the Prisma client and execute the migrations:
    ```bash
    yarn db:generate
    yarn db:migrate
    ```

## Running the Project

To start the development server, run:
  ```bash
  yarn dev
  ```

## Directory Structure

- `src/`: Houses the primary source files.
- `prisma/`: Contains the Prisma schema, migration files, and other related configurations.
- `package.json`: Specifies the project's dependencies and scripts.

## Main Dependencies and Their Uses

- **[Prisma](https://www.prisma.io/docs/)**: A database toolkit to facilitate type-safe database operations.
- **[Express](https://expressjs.com/)**: A minimalist web framework for Node.js, perfect for building APIs.
- **[Zod](https://github.com/colinhacks/zod)**: Useful for schema definition and validation.
- **[Jest](https://jestjs.io/)**: Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
- **[Supertest](https://github.com/visionmedia/supertest)**: Super-agent driven library for testing HTTP servers.
- **[Hapi Boom](https://hapi.dev/module/boom/)**: Creates HTTP-friendly error objects.

For an exhaustive list of dependencies, refer to the `package.json` file.
