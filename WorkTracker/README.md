ovde stao https://code-maze.com/net-core-web-development-part5/
# API

## Best practices
https://code-maze.com/aspnetcore-webapi-best-practices/
https://code-maze.com/net-core-series/

## Authentication
https://code-maze.com/authentication-aspnetcore-jwt-1/

## Repository pattern
https://code-maze.com/async-generic-repository-pattern/

## DB instructions

### Update tool
	`dotnet tool update --global dotnet-ef`

### Create migratio
	*	`dotnet ef migrations add [migrationName] --context RepositoryContext --project WebAPI`
	*	Examine Up and Down methods
	*	`dotnet ef database update --project WebAPI`

### Delete DB
	`drop-database -context [contextName]`

