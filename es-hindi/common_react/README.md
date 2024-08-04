This repository will be used as a submodule for all other languages repos. Below are the implementation points which are required to do in the code which will be done in this repo.
1. Folder structure should be similar to our main project just add a prefix common which represent the code is from common repo.
2. Add README file in every component which helps developer to use the component with details or data required by any particular component.
3. Try to not use any new npm module which is not present in the parent repo.
4. Exception handling and Errorboundary should be used for every component.

Git commands for submodule
1. Git clone your repository using git clone command
2. Add a submodule using add submodule command using new repo URL like this:
    git submodule add  https://github.com/nw-test.git
3. New folder with the name of new repo will be created and run following commands
    git submodule init
    git submodule update
4. To get update of your submodule run below command:
    git submodule update --remote --merge
5. Some example commands of git submodule: https://git-scm.com/book/en/v2/Git-Tools-Submodules#:~:text=Cloning%20a%20Project%20with%20Submodules&text=If%20you%20pass%20%2D%2Drecurse,the%20repository%20have%20submodules%20themselves.


Fresh Checkout of Repo
1. Command to get fresh checkout of main repo with submodule:
    git clone --recurse-submodules http://github.com/xyz.git
Or run below command after clone
    git submodule update --init --recursive
2. To update your submodule in your repo, use below command:
    git submodule update --remote --merge
3. In case you have done some changes in your submodule and now on updating submodule from remote it is showing conflict then run below command to sync your submodule
    git submodule sync --recursive
Then update your submodule using  
    git submodule update --remote --merge
4. Now use updated files from your submodule and also commit submodule changes in your local repo to origin so that next time when new people take pull and get updated submodule in their local repo.

Points need to take care
1. Implementation of new Components will happen in submodule repo only. Parent repo needs to sync its submodule and use the common components as required.
2. If Common Components are using any new npm module which is not available in the parent repo, then it must be added in the package.json file of parent repo’s who are using that submodule component.
3. Jenkins build script needs to update for all the parent repos who will use the submodule.
4. Developer who is creating common reusable component in submodule need to handle below points:
    A. All the props as well as all the dependencies should come from the parent.
    B. Handle all the scenarios like some languages can have different-2 layout or different ad slots, so keeping in mind that common components should have the option of customisation at language level.
    C.Exceptional handling needs to be done at every point in the common component.
    D. Common components should be responsive so that it works for both Desktop and mweb.
    E. Keep it short and break a big component into small parts so that it should be easy to understand by anyone. Use better comments and description on any checks or functions written inside it.
    F. Implement error boundary on all the common components.