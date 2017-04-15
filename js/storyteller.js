/*
storynode.js
Holds the StoryTeller class 
This is where all the magic happens, The creation of this class pulls down the Story and User data, Instantiates the user's current story node, and begins assembling the page.
Trey Franklin
Chaise Farrar
 */

class StoryTeller{

    constructor(){
        this.json_story = null;
        this.current_user = new User();
        this.current_story_node = null;
        this.current_story_node_uid = null;
        this.get_json_story();
        this.create_story_node();
        this.update_page();
    }

    get_json_story() {
        this.json_story = fetch("../Story.json").then(function(res){
            return res.json();
        });
        //var response = httpGet("https://raw.githubusercontent.com/afterthought325/LoneForest/master/Story.json");
        //if (response) {
        //    this.json_story = JSON.parse(response);
        //    return true;
        //} else {
        //    return false;
        //}
    }

    create_story_node(story_node_uid){
        if (this.json_story === null){
            return false;
        }

        let result = this.json_story[story_node_uid];
        //var result = $.grep(this.json_story.StoryNodes, function(story_node){ return story_node.id == story_node_uid; });

        if (result === null) {
            // no results found, error
            return false;

        } else {
            // found the requested story node
            this.current_story_node = result;
            this.selected_option = null;
            return true;
        }
    }

    update_story_node(story_option){
        // story_option is an integer corresponding to a location in the options array
        if (story_option >= this.current_story_node.story_options.length) {
            // story option isn't present
            return false;
        }

        this.selected_option = this.current_story_node.story_options[story_option];
        let death = getRandomInt(0, 100);  // play with fate and determine the death rate

        if (this.selected_option.chance_of_death >= death) {
            //TODO: need to replace this with a sweetalert
            alert("You died. Restart?");
            this.create_story_node(0);
            this.selected_option = null;
        }
        return true;
        
    }

    update_page(){
        //Inputing the Name into the Header.
        $("#subheading").text("Will you survive, "+this.current_user.firstname+"?");
    }
}
