const { execSync } = require("child_process");

module.exports = function(eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addWatchTarget('./src/css/tailwind.css');
  eleventyConfig.addPassthroughCopy({"node_modules/flowbite/dist": "lib/flowbite"} )
  eleventyConfig.addPassthroughCopy('./src/img');
  eleventyConfig.on('eleventy.after', async () => {
    console.log('Building Tailwind…');
    console.log(execSync('npm run build:tailwind').toString());
  });
  // Enable path prefix for GitHub Pages deployment
  if (process.env.PATH_PREFIX){
    eleventyConfig.addNunjucksGlobal("PATH_PREFIX", process.env.PATH_PREFIX);
  }

  eleventyConfig.addCollection('cards', collection => {
    return collection
      .getFilteredByGlob('./src/cards/*.md')
      .sort((a, b) => (Number(a.data.displayOrder) > Number(b.data.displayOrder) ? 1 : -1));
  });

  return {
    htmlTemplateEngine: "njk",
    dir: {
      input: 'src',
      output: 'public'
    }
  }
}
