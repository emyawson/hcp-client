# DEVOPS

### Main contacts:
- Angel Saldana (CI lead)
- Martino Turturiello (QA lead)

**Note:**
Always communicate in `hcp-devops` channel about issues you are currently looking at so everyone can be aware.

### Environments
1. [Dev Integration](https://univ-uploader-dev.rochedc.accentureanalytics.com/)
2. [Test Environment](https://univ-uploader-test.rochedc.accentureanalytics.com/)
3. QA (not available to developers)

####Pull requests
Jenkins is setup to run a pipeline on each PR, at least one approval is required to merge code into the codebase. 

**Note:** 

No code should be merged until all notes are resolved or have been thoroughly discussed with action items following. 

_**It is the responsibility of the developer that opened the PR**_ to create the appropriate tasks following a PR and to prioritize them with their SM.

If a task belongs to a different team or is best to be handled by a certain individual, proper hand-off is required.


####[Dev Integration](https://univ-uploader-dev.rochedc.accentureanalytics.com/)
Each merge into master is automatically deployed to Dev integration, the pipeline runs:

- Linting
- Testing
- Build
- Sonar Qube

####[Test Environment](https://univ-uploader-test.rochedc.accentureanalytics.com/)
Only versioned builds are released to the Test Environment. Each tagged version has an automatic pipeline created that will run to deploy to test. 
