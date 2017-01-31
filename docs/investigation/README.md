# Investigation and analysis of existing products

This document explores existing products that are similar to this project. It attempts to break down and document the following from a high level perspective.

* Key features delivered.
* Notable design choices and aspects.
* Technology stack used to develop the product if available.
* Notable development techniques if available.
* Pricing model / Open source model

## Existing products

* **[Prase](https://parse.com/)** - An open source backend for applications that scales. Parse was originally developed with a Software as a Service pricing model, however after being bought out by Facebook is was promptly dissolved. Parse now lives on as a self hosted open source solution.

  Parse offers a base "Parse Server" which acts as a wrapper around a document database. It then has many SDK's which can be used to help interact with the hosted Parse Server. Using these SDK's the developer can also write a further wrapping server if designed which can add more business logic around the basic document storage.

  As seen by looking at the code on GitHub.com, Parse use a simple combination of Node.js and MongoDB with many packages filling in gaps.

* **[LaunchDarkly](https://launchdarkly.com/)** - Feature flags as a service for systems of a large scale. The product is designed to fit with a pre-existing user account system. The software focuses purely on feature flags and different methods of rollout. They also have SDK's for many platforms to make access to the system easier than making manual REST calls.

  LaunchDarkly is closed source with a four tiered pricing scheme geared towards fast growing start-ups or large organisations with many needs.

  It has been made public on StackShare.io that LaunchDarkly use Ruby on Rails, Node.js, MongoDB, and React + Redux as their main technology stack.

  <center>![LaunchDarkly Interface example](./launchdarkly-interface.jpg =80%x80%)
  [_LaunchDarkly interface sample_](https://launchdarkly.com/features/index.html)</center>

* **[DailyCred](https://www.dailycred.com/)** - A registration and user management "software as a service" product. This product is designed to remove the entire need to have your own user account service, enabling you to simply hook into their product. The software is offered on a single scaling price dependant on number of user accounts and is closed source.

  DailyCred allows the adding of arbitrary data to a user using "Tags" and "Attributes". These make the platform more diverse could mean that the platform can be used for something simple like a user high score system without need for any supporting infrastructure.

  DailyCred's technology stack hasn't been made public that I can locate at this time.

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Key features</th>
      <th>Notable design aspects</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Parse</td>
      <td>
        <ul>
          <li>Free form object storage and retrieval warpped in a HTTP RESTful interface.</li>
          <li>Designed to scale to accommodate large applications.</li>
          <li>Self hosted only with no hosting service provided.</li>
          <li>Option to wrap Prase in a bespoke service to add further business logic to the object storage and retrieval.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>No graphical user interface to view data as this is dependant on the data being stored.</li>
          <li>All SDK's attempt to abstract away all complexity of making calls to the server, and provide a concise API.</li>
          <li>Encourages use of SDK's rather than directly calling the service.</li>
        <ul>
      </td>
    </tr>
    <tr>
      <td>LaunchDarkly</td>
      <td>
        <ul>
          <li>Simple on/off flagging.</li>
          <li>Percentage of population roll outs.</li>
          <li>Location based roll outs.</li>
          <li>SDK's in a number of popular technologies.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Graphical user interface to interact with feature flag and roll out systems.</li>
          <li>Fully documented RESTful API.</li>
          <li>SDK's which abstract the RESTful API.</li>
          <li>Simple user interface with few options to distract or confuse the user.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>DailyCred</td>
      <td>
        <ul>
          <li>Graphical interface to view accounts</li>
          <li>Social login capabilities (Facebook, Twitter, etc)</li>
          <li>Make use of the service to implement single-sign-on</li>
          <li>Enterprise grade security</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Clear API documentation</li>
          <li>A few SDK's but geared more towards web platforms (Node.js and Ruby on Rails)</li>
          <li>Designed to "scale" to meet all needs</li>
          <li>Minimalist user interface with basic analytics to attract enterprise organisations.</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

## Learnings and recommendations

This high level investigation into some similar products has rendered a lot of information that needs to be acted upon. Below are some recommendations based on the learning I've done.

* Most products seem geared towards organisations which wish to scale an application quickly. The prototype market that products such as Heroku (not a competitor product) is relatively untouched.
* Two out of three products are software-as-a-service (SaaS). This seems to be attractive but also incurs costs, in particular time. An similar approach to Parse would be a better fit for the scope. This confirms my current direction as described in the proposal and PID.
* The current trend for graphical user interfaces (GUIs) is for them to be "clean" and minimalist. As a result I'll ensure that my designs are simple and don't have many toggles and options.
* Technology stacks seem relatively varied, this doesn't help with making a decision but it means the stack can be left up to what I already have experience in.
* All three products have excellent API documentation, this highlights it as a focus area and will mean I'll need to include that in my design stage. Writing the API documentation before building it might be a useful approach.
* All three applications have extending SDK's which make accessing the service even easier. This is currently an optional extra to the project and due to time I don't think it warrants a change of my schedule. However consideration and designs of these may be useful.

## Sources

* https://parseplatform.github.io/
* https://github.com/ParsePlatform/parse-server
* https://launchdarkly.com
* https://stackshare.io/launchdarkly/launchdarkly
* https://www.dailycred.com/
