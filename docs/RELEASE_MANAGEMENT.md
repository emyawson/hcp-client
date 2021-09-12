# RELEASE MANAGEMENT

### Main contacts:
- Angel Saldana (CI lead)
- Martino Turturiello (QA lead)
- Purvi Kanal (SA)

**Note:**
Always communicate in `hcp-all-teams-general` channel to communicate to all team members that release management is in progress.

### Release branch 
**Make sure you have the rights to create a branch or ask Purvi/Sean**

1. Create a branch through the Gitlab UI from previous release (or master), branch name `release/x.x.x`
2. Checkout the upstream branch
3. Update `package.json` version
3. Create a tag  `vX.X.X`
4. Push tags + changes directly to the upstream branch
5. Create a confluence page to track the changes for the new release cycle

### Release procedure
Each release consists of a **fixed version** linked to a feature set and a _specific feature-freeze date_. The release managers job is to keep track of the PR's that are `tagged` with the **fixed-version** that has to be released. All bug-fixes must be merged into master first! Their job is to then _cherry-pick_ those specific changes from _master_ onto _release/x.x.x_. 

It may happen that some bugfixes will be specific to _release/x.x.x_, due to diverging feature sets, in which case the merge request must point directly to the release branch and not to master. 

The release manager must sync master to the release branch as often as possible, preferably once a day. Each release sync should keep track to what has been _cherry-picked_ so far, by documenting it on [confluence](https://confluence.rochedc.accentureanalytics.com/pages/viewpage.action?pageId=7012717)

When a feature-freeze date has been reached **NO CODE** is allowed to be merged into master that will affect the release after `4pm GMT-6` or `22:00 GMT+1`.

 **Anyone** can be a release manager, please make sure you communicate with the SA on your team if you would like to learn.
 
 