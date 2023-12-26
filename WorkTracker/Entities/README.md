# DB

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
	`dotnet ef drop-database -context RepositoryContext --project WebAPI`

	==============================================TODO=========================

	*	add date created, and user in all tables  - ima u hrani