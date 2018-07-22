package com.app;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/*
 * Convenience annotation, includes
 * @Configuration: Source of bean definitions
 * @EnableAutoConfiguration: start adding beans based on classpath settings, other beans, and various property settings.
 * @EnableWebMvc: Flags this as a web app and activates key behaviors, like `Dispatcher Servlet`
 * @ComponentScan:  tells Spring to look for other components, conf
 * gurations, and services in the hello package,
 * allowing it to find the controllers.
 */
@SpringBootApplication
@EnableJpaAuditing
@ComponentScan
public class Application {

	/**
	 * Runs the whole application.
	 */
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
	/*
	 * Runs on startup
	 */
	@Bean
	public CommandLineRunner commandLineRunner(Environment environment) {
		return args -> {
			System.out.println("App is now available at http://localhost:8080");
		};
	}

}