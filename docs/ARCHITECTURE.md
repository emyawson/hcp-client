# Architecture
Within our app there are a few core concepts that have been introduced to isolate and scale the project accordingly.
Each concept is enforced by the team and thus should be followed to ensure consistency across the app structure.

### Domain driven development
A paradigm that allows us to separate the multiple facets of the app into domains, thus allowing us to scale vertically and maintain a complex architecture in a simple fashion.

Within our app a domain typically is linked to a valid bundling of business units that combine a larger scale of functionality. Strip management is an ideal example of a combination of pieces that form a whole.

Typically a domain encapsulates all of it's functionality so it does not create cross-cutting dependencies, thus enforcing low coupling and high cohesion.
Our app enforces this by bundling together all the routes of a domain, we chose to use a route as the highest level identifier of the blueprint of a domain.

One can then go into a domain and quickly figure out the blueprint of that domain, without having to cross multiple boundaries of the app.

![]("assets/domains.svg")

Within each domain the structure follows the previous flat structure of the app. This way we can still iterate in a feature-based approach.
```text
src/domains/strip-management
├── bundles.js
├── components
├── routes.js
├── scenes
├── utils
└── widgets
```

The top level `routes.js` and `bundle.js` files are where the magic happens. They bundle together all the routes and split out the necessary chunks for each route.
This makes up the blueprint of a route:

```jsx harmony
export const AuthenticationRoutes = () => (
  <Switch>
    <RouterOutlet path="/(|auth)">
      <AuthContainer>
        <Switch>
          <Route exact path="/(|auth/login)" component={LoginBundle} />
          <ProtectedRoute
            exact
            path="/auth/first-time"
            component={FirstTimeBundle}
          />
        </Switch>
      </AuthContainer>
    </RouterOutlet>
  </Switch>
);
```

> Please not that the code above is using a router outlet 
to wrap certain routes with common UI that stays the same
across routes.

### Core
The concept of core in our app is to create a common place for business logic to live linked to the technologies we use.
Given this, it should be pure and reusable, the core folder can have it's own external dependencies (redux, observables, etc.), but cannot pull dependencies from within the app.

It is a one-way street, certain parts of the app can pull from core, but core cannot pull from other parts of the app.

The purpose of core is to supply common `actions`, `reducers`, `selectors`, `epics` etc. that encapsulate a core business unit.
Using strip-management once more as an example, the core folder should contain the common pattern of redux/epics/selectors that will be used
across domains, often when implementing the connection to a certain API endpoint we have to think about the reusability of this endpoint and the data it shares across the app.

That's why in any given scenario we don't want to link a connection to an endpoint within a certain domain, because we must think of the cross-cutting dependencies. At any given point we want to be able to move core into a different project and say `INITIALIZE` and it will setup a redux store that is ready to receive actions for all business units it knows off. Thus it will allow us to bootstrap apps quickly with a business logic interface.

![]("assets/core.svg")
