# Contribution Guidelines

## Project Background
[Evrim Ağacı](https://evrimagaci.org/) is the largest and most visited popular science organization in Turkey that has been creating science communication content since 2010 relying solely on direct audience support. We try to develop tools for the general public to improve their understanding and appreciation of science. This process led us to develop a project that envisions a chemistry portal that starts with a periodic table. Our beloved friends at [Bionluk](https://bionluk.com/) helped us during the first stage of the project and [Periodum](http://periodum.com/) was born. Then, we decided to carry this effort to open source, because we wanted to create a project that relies on community effort and anyone can freely use and develop this backbone of a chemistry platform.

If you would like to be a part of this amazing project, feel free to contribute by following the guidelines listed below.

## Ways to Contribute
You can contribute Periodum Project as follows:

- Open new [issues](https://github.com/evrimagaci/periodum/issues/new/choose),
- [Read](https://github.com/evrimagaci/periodum)/[discuss](https://github.com/evrimagaci/periodum/discussions) the current status of the code,
- Send pull requests,
- Recommend new features.

## How to Contribute

For all changes, we follow the [Github Flow](https://guides.github.com/introduction/flow/index.html). In summary:
1. Fork the repository and create your own branch.
2. If you added new code that requires testing, add the suitable tests.
3. Make sure your code passes the tests.
5. Make sure your code has no errors in linters.
6. **Add the relevant issue to your PR; otherwise, create a new issue first and then submit your PR.**

## Issues
If you see any [issues](https://github.com/evrimagaci/periodum/issues) on the website, you can report these using the [new issue](https://github.com/evrimagaci/periodum/issues/new) section of Github.

We have certain rules to review and fix the issues, so please follow these steps:

### Example Issue
If you want to see an example, please review [this issue.](https://github.com/evrimagaci/periodum/issues/18)

### Issue Template Description
You may find the issue template description and additional examples below:

- **Issue Title**: Write a short title to describe the issue. Please do not be too specific. Correct example: *Temperature scrollbar does not work after first use*

- **Description**: Describe the details of the issue with a few sentences, give your opinions on what may be causing the issue, what solutions you tried and any recommendations for a solution. If the title is clear enough, you may skip this portion. The shorter and more concise you are the better.

- **Issue URL**: If the issue is at the homepage, you may skip this step since we are working mostly on a single-page website. However, if there is an issue in one of the deeper pages, please enter the URL here. Eg: *https://periodum.com/bir/url/yolu*

- **Steps**: List the steps you took to encounter the issue. This is the most important step for us to figure out what the issue is. For example:
    1. *Homepage loads.*
    2. *Temperature scrollbar is dragged.*
    3. *Temperature scrollbar is released.*
    4. *Temperature scrollbar is dragged again.*

- **Expected Result vs. Actual Result**: Please enter the expected result from the module in question and the actual result that is obtained. For example: 
    - ***Expected Result**: When the "Detailed Info" button is clicked, an infobox with text should appear.*
    - ***Gerçekleşen Sonuç**: When the Detailed Info" button is clicked, an infobox appears with no text related to the element.*

- **Screen Shot/Video**: For us to investigate the issue better, please include a screenshot or recording.

- **User Session**: Please add the device and browser info you used to encounter the issue:
    - Browser Brand and Version (Eg: *Google Chrome 97.0.4692.71 (Official Build) (64-bit)*)
    - Operating System and Version/Build Number (Örn: *Ubuntu 20.04.3 LTS*)

- **Urgency Level**: Please pick an urgency level depending on the impact of the issue:

    - **Critical:** Use this level if the website does not load, if the website is inaccessible, or if website loads but no further action can be taken. 
    - **High:** Use this level if the issue prevents the use of the website partially or fully when encountered.
    - **Medium:**  Use this level if the issue does not prevent the website from being used but it prevents a specific module from loading. Usually these types of issues does not repeat itself if you refresh the page or follow the exact steps taken to encounter the issue in the first place.
    - **Low:**  Use this level for issues that does not impact the use of the website, such as cosmetic errors, image errors, and console warnings/errors.

- **Code Sample:** You can write the code block that causes the issue (or any relevant code blocks).

## Pull Requests (PRs)

Please note that it may take some time to review and approve your [PRs](https://github.com/evrimagaci/periodum/pulls). You may find some of our recommendations below that may facilitate the timely approval and addition of your contributions to the main code:

**1. Keep it Short**

Sending your PRs _by changing the least possible number of files_ will speed the review and approval process. Additionally, _the more goal-oriented and small_ your code is, the easier it will be for us to keep the project/code legible and clean.

**2. Review Your Code**
Please create a draft PR and review your changes. This way, you can prevent many of the errors/bugs that may occur down the line and this will speed up the official review process. Additionally, this step will allow you to find the more effective/optimal/alternative ways to write your code, if applicable.

**3. Clean-up**
Some changes that are left in the code, such as *white space*, *code format changes*, *library imports* that may be irrelevant to the PR, can cause swelling on git. These may alos create problems in the development environment. In order to prevent these types of changes, please run the `npm run lint` command and check your code in terms of cleanliness and formatting.

**4. Meaningful Titles**

Please choose a short but clear title for your PR that reflects the changes or the utility of your code. The name you used to branch may guide you in this step.

**5. Explanations**

**Always enter an explanation for each PR.** In the explanation section, make sure you include the following:

- Describe what your changes do in detail.
- Add notes and/or questions for reviewers/maintainers. 
- Explain how we can see/test your changes on the website.
- Add a screenshot or a screen recording.

**6. Take Each Comment Seriously**

Periodum Project is an open source project and is run solely by volunteers. The comments given to your changes are to ensure the best possible outcome from your contributions. All of these comments are written by volunteers like yourself. Please always remember that communication is key in programming and we believe that these valuable skills develop only when they are used.

If you see any comments that include slight, insults, hate speech, nudity, please [let us know](mailto:info@evrimagaci.org).

## License

All code changes you send are covered by the [OSL-3.0 License](https://github.com/evrimagaci/periodum/blob/main/LICENSE) that also covers the entirety of this project. If you have any questions about this license, feel free to [contact us](mailto:info@evrimagaci.org).
