
# Creating a Web Server

>**files**: _routes/index.js_, _views/helloWorldDummy00.hbs_\
>**route path**: _/hwdummy00_\
>**query**: _name_\
>**example**: _/hwdummy00?name=SistemaOn_

>**files**: _routes/index.js_\
>**route path**: _/hello/static/:pathName_\
>**params**: _pathName_\
>**routes available**: _/hello/static/root_, _/hello/static/hello_

>**files**: _routes/lab.3.1.js_, _3.1.data.js_, _3.1.validate.js_\
>**route path**: _/lab-3-1_
>
>**run command**: _node 3.1.validate.js_
>
>**Objective**:
> - Responds to GET '/lab-3-1' with data from file '3.1.data.js'
> - Responds status '404' to GET to any other route from '/lab-3-1'

>**files**: _routes/lab.3.2.js_, _3.2.validate.js_\
>**route path**: _/lab-3-2_
>
>**run command**: _node 3.2.validate.js_
>
>**Objective**:
> - Responds to GET '/lab-3-2' with status '200' OK
> - Responds to POST with status '405' Method Not Allowed

---

# Serving Web Content

>**files**: _routes/hello.js_, _views/helloWorldDummy01.hbs_, _views/layout.hbs_, _views/index.hbs_\
>**route path**: _/hello_, _/hello?greeting=query\
>**query**: _greeting_\
>**example**: _/hello_ or _/hello?greeting=Sistemaon_

>**files**: _routes/articles.js_, _views/articles.hbs_\
>**route path**: _/articles_, _/articles?amount=query&type=query, _/articles/me_\
>**query**: _amount_, _type_\
>**example**: _/articles?amount=10&type=html_ or _/articles/me_
>
>**run command**: _node 4.1.validate.js_
>
>**Objective**:
> - Renders a view with stream content on route _/articles/me_ responding to GET with status '200' OK
> - Reuses the default layout file _layout.hbs_ view to render

>**files**: _routes/articles.js_\
>**route path**: _/articles/data_\
>**example**: _/articles/data_
>
>**run command**: _node 4.2.validate.js_
>
>**Objective**:
> - Respond with stream content on route _/articles/data_ to GET with status '200' OK
> - Delay expected in response stream on route _/articles/data_

---

# Creating RESTful JSON Services

>**files**: _models/bicycle.js_, routes/bicycle.js_\
>**route path**: _/bicycle/:id_\
>**params**: _id_\
>**example**: _/bicycle/1_

>**files**: _models/model.js_, models/lab.5.1.model.js_, _routes/lab.5.1.js_\
>**route path**: _/lab-5-1/boat/:id_\
>**params**: _id_\
>**example**: _/lab-5-1/boat/1_
>
>**run command**: _node 5.1.validate.js_
>
>**Objective**:
> - Respond to GET with status '200' OK
> - Correct header set content-type to application/json
> - Respond to GET with status '404' NOT FOUND unexisted route, or id not found in model boat
> - Respond to GET with status '500' INTERNAL SERVER ERROR for unexpected errors in model boat
> - Respond to GET with status '400' BAD REQUEST or '404' NOT FOUND or '405' METHOD NOT ALLOWED to unsupported methods

---
---