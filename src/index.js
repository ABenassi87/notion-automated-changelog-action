const core = require('@actions/core');
const { Client, LogLevel } = require('@notionhq/client');

function main() {
  try {
    const token = core.getInput('token');
    const name = core.getInput('name');
    const changelog = core.getInput('changelog');
    const environment = core.getInput('environment');
    const database = core.getInput('database');
    const date = new Date().toISOString();

    core.debug('Creating notion client ...');
    const notion = new Client({
      auth: token,
      logLevel: LogLevel.ERROR,
    });

    core.debug('Creating page ...');
    notion.pages
      .create({
        parent: {
          database_id: database,
        },
        properties: {
          Name: {
            title: [
              {
                text: {
                  content: name,
                },
              },
            ],
          },
          Date: {
            date: {
              start: date,
            },
          },
          Changelog: {
            rich_text: [
              {
                text: {
                  content: changelog
                },
              },
            ],
          },
          Environment: {
            multi_select: [{
              name: environment,
            }],
          },
        },
      })
      .then((result) => {
        core.debug(`${result}`);
        core.setOutput('status', 'complete');
      })
      .catch((error) => {
        core.setFailed(error.message);
      });
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();
