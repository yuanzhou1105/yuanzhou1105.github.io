# Yuan Zhou's academic website

A single-page academic website made with HTML, CSS, and vanilla JavaScript. It has no dependencies, package installation, or build step. All content and the expandable abstracts work without JavaScript; JavaScript adds the mobile menu and current-section indicator.

## Preview on your Mac

The quickest option is to double-click `index.html` in Finder. The page, photograph, abstracts, and paper links work directly from the folder.

For a preview closer to GitHub Pages, open Terminal and run:

```sh
cd /Users/zhouyuan/Documents/GitHub/yuanzhou1105.github.io
python3 -m http.server 8000 --bind 127.0.0.1
```

Then open [http://127.0.0.1:8000](http://127.0.0.1:8000) in your browser. Keep Terminal open while reviewing. Press **Control+C** in that Terminal to stop the server. If port 8000 is already in use, change it to 8001 and open `http://127.0.0.1:8001` instead. The server is bound to your Mac only; starting it does not publish the site.

Refresh the browser after changing a file. Resize the window to check the mobile layout. Try each Abstract control and paper link before publishing.

The layout has been checked in 33 browser viewports from 320 to 3440 CSS pixels wide, including phone and tablet portrait/landscape sizes and both sides of the layout breakpoints. Checks covered collapsed and expanded abstracts, navigation overlap, horizontal overflow, and the open mobile menu. CV and syllabus links were opened successfully. These are browser viewport checks, not tests on physical iPhones or iPads.

## Where everything lives

```text
index.html                         The complete page and its visible content
css/style.css                      Typography, colors, spacing, responsive layout
js/main.js                         Mobile navigation and current-section indicator
assets/
  images/profile/yuan-zhou.jpg     Public, web-sized portrait without photo metadata
  files/papers/
    Creation_Puzzle.pdf            Unchanged copy of the supplied draft
    Hiring_Your_Own.pdf            Unchanged copy of the supplied draft
  files/cv/Yuan_Zhou_CV.pdf        Unchanged copy of the supplied CV
  files/teaching/                  Unchanged copies of the two supplied syllabi
content/website_content.md         Authoritative factual source
source_materials/                 Private originals; ignored by Git
.gitignore                        Excludes source_materials/ and .DS_Store
.gitattributes                    Keeps PDF files binary in Git
.nojekyll                         Tells GitHub Pages to serve the static site directly
robots.txt                        Allows crawling and points to the sitemap
sitemap.xml                       Lists the public homepage for search engines
README.md                         These instructions
```

The CV is linked in the navigation and introduction. Each instructor course has a Syllabus link. These three public PDFs are unchanged copies, included with your explicit approval after reviewing their phone, meeting, enrollment, and metadata details. Originals remain in `source_materials/cv/` and `source_materials/teaching/`. Future research figures can go in `assets/images/research/`.

## Update the content

`content/website_content.md` is the factual source, but it is **not automatically loaded** by the page. With no build system, the displayed text lives in `index.html`. Update both when you change a fact. Comments and descriptive section IDs in the HTML identify each part of the page.

Use only confirmed information. Leave out unavailable elements rather than adding empty links or “coming soon” labels. The content file is not ignored by Git: keep it suitable for a public repository, too. Private notes, referee reports, and student records belong outside public files.

### Update a paper

1. Find its `<article class="paper">` in `index.html`. The current IDs are `creation-puzzle`, `hiring-your-own`, and `congressional-trading`.
2. Edit the title, status, summary, abstract, and presentations as needed. Keep their facts consistent with `content/website_content.md`.
3. To replace a draft, copy the approved PDF into `assets/files/papers/`. Keeping the same filename preserves existing links. If you rename it, update the matching `href` in `index.html` exactly, including capitalization.
4. If a presentation is scheduled, keep that label until it has occurred and you have confirmed the update.

The supplied `Hiring_Your_Own` reference was matched to `Hiring_Your_Own.pdf`. The congressional-trading project has no draft, so it has no Draft link. SSRN, Slides, and coauthor rows are omitted because none were supplied.

### Add a future research project

1. Add its confirmed information to `content/website_content.md`.
2. Duplicate one entire research `<article>...</article>` inside the `papers` container in `index.html`.
3. Change the project number, article ID, heading ID, `aria-labelledby`, and the hidden title in the Abstract control. IDs must be unique.
4. Replace the content. If it has coauthors, add a `<p class="coauthors">` immediately after the title. If there are none, omit this paragraph.
5. Keep only links to real public files or supplied professional URLs. Remove the entire presentations block when no presentations exist.

To add SSRN or Slides, add ordinary labeled links after the `paper-actions` container; do not use a blank `href` or `#`. Add a descriptive hidden paper title, as the existing Draft links do, to distinguish links for screen-reader users.

For real research figures, the stylesheet already supports a `research-gallery` container inside each paper. Each image should be inside a semantic `figure`, have a descriptive `alt`, and be followed by a `figcaption`. A link around the image can open the full-size file. Add no gallery until images and accurate captions are available.

### Replace the CV

Copy your approved replacement to `assets/files/cv/Yuan_Zhou_CV.pdf`. Keep the same public filename so the navigation and introduction links continue to work. Preserve the original in `source_materials/cv/`.

The **CV** link before Contact in the navigation and the **Curriculum Vitae** link in the introduction both open the PDF in the browser. The navigation script tracks only anchor links beginning with `#`; direct PDF links are not treated as page sections.

### Replace public syllabi

Copy approved replacements into `assets/files/teaching/`, retaining the filenames used by the Syllabus links in `index.html`. If filenames change, update those links too. Check visible content, PDF metadata, comments, links, and attachments before copying. The original syllabi remain unchanged.

The instructor course names are **Investment Analysis** and **Managerial Finance I**, matching the supplied syllabi and your correction. The content file has been updated to match. The separate undergraduate TA course remains **Investments**, as supplied; no syllabus for that TA experience was provided.

### Replace the portrait

The public photograph is `assets/images/profile/yuan-zhou.jpg` (800 × 1200 pixels). It was exported from the supplied photograph for faster loading and its EXIF, XMP, and IPTC metadata were removed. The original is unchanged. For a replacement, use a suitably sized public image without private metadata, keep the filename, and update the HTML `width` and `height` if its proportions change.

### Teaching and service

Student quotations are exactly the selected comments from the content file, with only HTML entity decoding and whitespace normalization for display. Do not add student identities or raw evaluations.

The teaching award is **Dean's Award for Outstanding Teaching**, and the content file matches. **The Corporate Bond ETF Creation Puzzle** is labeled **Job Market Paper**. The congressional-trading project remains **Working Paper** without a Draft link. The CV also lists other work in progress and teaching administration; these have not been added as separate website entries beyond your requested scope.

Referee service lists only the journal and year. Conference discussant entries list the meeting and year. No manuscript titles, authors, or referee reports are included in the page.

## Protect the original materials

Never link a website element to `source_materials/`. Copy only approved public files into `assets/`; every asset should be safe to publish even if it is not linked from the homepage. Do not add datasets, code from research projects, credentials, raw evaluations, or private files.

The ignore rule prevents ordinary Git operations from adding the source folder. It does not protect against force-adding a file or remove a file that was already tracked. Before any future commit, check:

```sh
git check-ignore -v source_materials/
git ls-files -- source_materials/
git status --short
git diff --cached --name-only
```

The first command should identify `.gitignore`. The second should return nothing. Review the last two outputs for unintended files. Avoid `git add -f` on private materials. Do not upload the whole Mac folder as a deployment artifact; ignored files must stay out of the upload.

## Publish with GitHub Pages

Review updates locally and check the staged files before committing and pushing to `main`.

The publishing source should be **Settings → Pages → Deploy from a branch → main → /(root)**. GitHub publishes updates pushed to that source. The `.nojekyll` file allows direct static deployment; you need no local build or custom workflow. The public site address is [yuanzhou1105.github.io](https://yuanzhou1105.github.io/). Check deployment progress in the repository's [Actions tab](https://github.com/yuanzhou1105/yuanzhou1105.github.io/actions). See [GitHub's publishing-source instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

All page assets use relative paths and exact filename capitalization. The canonical URL, Open Graph metadata, ProfilePage/Person JSON-LD, robots.txt, and sitemap.xml use the public GitHub Pages address; update those if you later change domains. Structured data describes only the profile and affiliation already stated on the page.
