# Research and decision of technology stacks

This document outlines and compares potential technology choices for particular components of the project. The document discusses pro's and con's for each technology and ultimately renders a decision of the technology stack (tech stack) to be used for the project.

It is important to note that the pros and cons are not all evenly weighted in all areas.

## Core server side language

This component will build up the majority of the server-side business logic. Dealing with HTTP requests coming in and sending out the relevant data. It will need to be able to connect to a database easily and retrieve / store data.

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Framework options</th>
      <th>Pros</th>
      <th>Cons</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Ruby</td>
      <td>
        <ul>
          <li>Ruby on Rails (RoR)</li>
          <li>Sinatra</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Active development on all frameworks and the language.</li>
          <li>Plenty of supporting documentation and resources.</li>
          <li>Ruby is a language I have extensive experience with but not within the industry.</li>
          <li>A vast number of open source libraries (gems) which are easily accessible with a package manager (RubyGems).</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Criticised for being a slow language on the server side.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Nodejs (JavaScript server side)</td>
      <td>
        <ul>
          <li>ExpressJs</li>
          <li>Koajs</li>
          <li>Sailsjs</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>I have extensive industry experience with Nodejs and all listed frameworks.</li>
          <li>Uses I/O loop to simulate concurrency to negate speed issues with JavaScript.</li>
          <li>A vast number of open source libraries (npm packages) which are easily accessible with a package manager (npm).</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Libraries often have problems with triggering callbacks twice.</li>
          <li>Poor error handling within Nodejs</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>C#</td>
      <td>
        <ul>
          <li>ASP.NET MVC</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Active development.</li>
          <li>Strong ecosystem</li>
          <li>Plenty of support resources</li>
          <li>A vast number of open source libraries (dlls) which are easily accessible with a package manager (nuget).</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Expensive to host without using Mono to compile for linux.</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
