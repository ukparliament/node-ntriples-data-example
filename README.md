# Node N-triples Data Examples

This simple [Node.js][node] application was created by the [Parliamentary Digital Service][pds] to act as a proof of concept, showing how an external party could load data from the new Parliamentary beta website.

[![License][shield-license]][info-license]

> *NOTE:* You can view a running example of this application on [Heroku][heroku] at:
> http://aqueous-tor-14631.herokuapp.com

### Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Requirements](#requirements)
- [Quick start](#quick-start)
- [Contributing](#contributing)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Requirements
This application requires the following:
* [Node.js][node] - [click here][node-version] for the exact version
* [NPM][npm]

## Quick start
To clone the repository and set up the dependencies, run the following:

```bash
git clone https://github.com/ukparliament/node-ntriples-data-example.git
cd node-ntriples-data-example
npm install
npm start
```

In your browser at: [http://localhost:8080](http://localhost:8080) you should now be able to see the application running.

You should see something like this:

![Application Screenshot](https://raw.githubusercontent.com/ukparliament/node-ntriples-data-example/master/assets/images/screenshot.png)

## Contributing
If you wish to submit a bug fix or feature, you can create a pull request and it will be merged pending a code review.

1. Fork the repository
1. Create your feature branch (`git checkout -b my-new-feature`)
1. Commit your changes (`git commit -am 'Add some feature'`)
1. Push to the branch (`git push origin my-new-feature`)
1. Ensure your changes are tested using [Rspec][rspec]
1. Create a new Pull Request



## License
This application is licensed under the [Open Parliament Licence][info-license].

[node]:         https://nodejs.org/en/
[npm]:          https://www.npmjs.com
[pds]:          https://www.parliament.uk/mps-lords-and-offices/offices/bicameral/parliamentary-digital-service/
[heroku]:       https://www.heroku.com
[node-version]: https://github.com/ukparliament/node-ntriples-data-example/blob/master/.nvmrc
[screenshot]:   https://raw.githubusercontent.com/ukparliament/node-ntriples-data-example/master/screenshot.png

[info-license]:   http://www.parliament.uk/site-information/copyright-parliament/open-parliament-licence/
[shield-license]: https://img.shields.io/badge/license-Open%20Parliament%20Licence-blue.svg
