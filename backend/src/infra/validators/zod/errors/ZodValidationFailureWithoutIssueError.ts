export class ZodValidationFailureWithoutIssueError extends Error {
  constructor () {
    super('Unexpected validation failure without issue')
  }
}
