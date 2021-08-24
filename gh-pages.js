var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/LucasGobbs/TCC_FrontEnd', // Update to point to your repository  
        user: {
            name: 'LucasGobbs', // update to use your name
            email: 'llcostagobbi@gmail.com' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)