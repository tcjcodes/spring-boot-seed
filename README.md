# Spring Boot Seed Project

Seed project for Java + Spring Boot web application for technologies I'm familiar with.

## Getting Started

**Prerequisites:**

- Maven 3.5.4 (and on the PATH, verifiable by command `mvn -v`): [Maven Downloads](https://maven.apache.org/download.cgi)
- Java 8+: [JDK 8 Downloads](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) 

Run this from the root directory:
```bash
mvn spring-boot:run
```
The app will be available at http://localhost:8080

This will install all dependencies, run the front end build, compile the project into an executable JAR, run it, and optionally populate the database.

### Database

The H2 console to see the database can be viewed at: http://localhost:8080/h2-console 
Settings:

- JDBC URL: `jdbc:h2:mem:testdb`, 
- user: `sa`
- no password

## Technologies

- Maven
- [Spring Boot](https://spring.io/): dependency injection, configuration, servlet containers, allows using other Spring technologies, like Spring JPA.
  - [Spring JPA](https://projects.spring.io/spring-data-jpa/)
  - H2 Database [See below](#database)
- Java
- JUnit
- EasyMock
- Typescript
- Webpack

