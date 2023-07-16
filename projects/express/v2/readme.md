
# Creating a Web Server

>**files**: _routes/index.js_, _views/helloWorldDummy00.hbs_\
>**route path**: _/hwdummy00_\
>**query**: _name_\
>**example**: _/hwdummy00?name=SistemaOn_

>**files**: _routes/index.js_\
>**route path**: _/hello/static_\
>**params**: _pathName_\
>**routes available**: _/hello/static/root_, _/hello/static/hello_

>**files**: _routes/lab.3.1.js_, _3.1.data.js_, _3.1.validate.js_\
>**route path**: _/lab-3-1_\
>**run command**: _node 3.1.validate.js_
>
>**Objective**:
> - Responds to GET '/lab-3-1' with data from file '3.1.data.js'
> - Responds status '404' to GET to any other route from '/lab-3-1'

>**files**: _routes/lab.3.2.js_, _3.2.validate.js_\
>**route path**: _/lab-3-2_\
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

---
---