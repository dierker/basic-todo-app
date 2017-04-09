jQuery(document).ready(function($){
   
    var model = {
        completed: [],
        incomplete: [],
        complete: function(task, id) {
            model.completed.push({
                id: id,
                task: task
            });
        },
        save: function(task) {
            model.incomplete.push({
                id: model.incomplete.length,
                task: task 
            });
        }
    };
    
    var todo = {
        init: function() {
            nav.load();
            app.load();
            incomplete.load(model.incomplete);
            handlers.load();
        },
        complete: function(task, id) {
            model.complete(task, id);
            var index = model.incomplete.findIndex(function(o) {
                return o.id === id; 
            });
            model.incomplete.splice(index, 1);
        },
        save: function(task) {
            model.save(task);
        },
        count: function() {
            return model.incomplete.length;
        },
        loadCompleted: function() {
            complete.load(model.completed);   
        },
        loadIncomplete: function() {
            incomplete.load(model.incomplete);   
        },
        removeTodo: function(id, list) {
            var index = model[list].findIndex(function(o) {
                return o.id === id; 
            });
            model[list].splice(index, 1);
        }
    };
    
    var nav = {
        load: function() {
            var nav = "<nav><a class='incomplete' href='#'>Incomplete Tasks</a> <a class='complete' href='#'>Completed Tasks</a></nav>";   
            nav += "<input type='text' class='new-task' placeholder='Input new task here...'/><br/>";
            nav += "<input type='button' class='add-task' value='+ Add'/><br/>";
            $("body").append(nav);
        }
    };
    
    var app = {
        load: function() {
            var app = "<div class='app'></div>";   
            $("body").append(app);
        }
    };
    
    var incomplete = {
        load: function(tasks) {
            var incomplete = "<div class='incomplete task-list'>";
            incomplete += "<h1>Incomplete Tasks</h1>";
            incomplete += "<ul class='task-list'>";
            $.each(tasks,function(i,x) {
                incomplete += "<li><a href='#' class='complete'>&#x2713</a> <a href='#' class='remove'>X</a> <span id='"+tasks[i].id+"' class='task'>"+tasks[i].task+"</span></li>";
            });
            incomplete += "</ul>";
            incomplete += "</div>";
            $(".app").html(incomplete);
        }
    };
    var complete = {
        load: function(tasks) {
            $(".complete.task-list").remove();
            var completed = "<div class='completed task-list'>";
            completed += "<h1>Completed Tasks</h1>";
            completed += "<ul class='task-list'>";
            $.each(tasks,function(i,x) {
            });
            completed += "</ul>";
            completed += "</div>";
            $(".app").html(completed);
        }
    };
    var handlers = {
        load: function() {
            $(".add-task").on("click", function() {
                var task = $(".new-task").val(); 
                $(".incomplete.task-list").append("<li><a href='#' class='complete'>&#x2713</a> <a href='#' class='remove'>X</a> <span id='"+todo.count()+"' class='task'>"+task+"</span></li>");
                todo.save(task);
                $(".new-task").val("");
            });
            $(".app").on("click", ".remove", function() {
                var list = $(this).parents(".task-list").hasClass("completed") ? "completed" : "incomplete";
                $(this).parent().remove();
                todo.removeTodo($(this).find("span").attr("id"), list);
            });
            $(".app").on("click", ".complete", function() {
                var id = $(this).parent().find(".task").attr("id");
                todo.complete($(this).parent().find(".task").html(), id);
                $(this).parent().remove();
            });
            $("a.incomplete").on("click", function() {
                todo.loadIncomplete();
            });
            $("a.complete").on("click", function() {
                todo.loadCompleted();
            });
        }
    };
    
    todo.init();
    
});