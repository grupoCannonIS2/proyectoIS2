var searchData=
[
  ['beforeall_526',['beforeAll',['../members_8test_8js.html#adac68e9cc88f22a1d12834e392d4d724',1,'beforeAll(async()=&gt; { await getUser(&quot;member1&quot;, &quot;member1@test.com&quot;, &quot;test uno&quot;).catch((err)=&gt; console.log(&quot;error al crear usuario&quot;));await getUser(&quot;member2&quot;, &quot;member2@test.com&quot;, &quot;test dos&quot;).catch((err)=&gt; console.log(&quot;error al crear usuario&quot;));const res=await createProject({ projectName:&quot;membersTestProject&quot;, estimation:&quot;10&quot;, scrumMasterId:&quot;member1&quot;, }).catch((err)=&gt; console.log(&quot;error al crear proyecto&quot;));projectId=res.data.id;}):&#160;members.test.js'],['../projects_8test_8js.html#ad7df3cb49bd35d2067a64adbbc33d494',1,'beforeAll(async()=&gt; { const res=await getUser(998, &quot;test@test.com&quot;, &quot;project tests&quot;);const { email, nombre, id }=res;expect(email).toBe(&quot;test@test.com&quot;);expect(nombre).toBe(&quot;project tests&quot;);expect(id).toBe(&quot;998&quot;);}):&#160;projects.test.js'],['../roles_8test_8js.html#aa0a2a5e420ffd652a745616b34d86a40',1,'beforeAll(async()=&gt; { await getUser(&quot;test&quot;, &quot;test1@test.com&quot;, &quot;test uno&quot;).catch((err)=&gt; console.log(&quot;error al crear usuario&quot;));await getUser(&quot;test2&quot;, &quot;test2@test.com&quot;, &quot;test dos&quot;).catch((err)=&gt; console.log(&quot;error al crear usuario&quot;));const res=await createProject({ projectName:&quot;roleTest&quot;, estimation:&quot;10&quot;, scrumMasterId:&quot;test&quot;, }).catch((err)=&gt; console.log(&quot;error al crear proyecto&quot;));projectId=res.data.id;await addMemberToProject(projectId, &quot;test2&quot;);}):&#160;roles.test.js'],['../sprints_8test_8js.html#a22e080a704e374335894efe8190b9b4b',1,'beforeAll(async()=&gt; { await getUser(&quot;sprintTest&quot;, &quot;sprintTest@test.com&quot;, &quot;test uno&quot;).catch((err)=&gt; console.log(&quot;error al crear usuario&quot;));await getUser(&quot;sprintTest2&quot;, &quot;sprintTest2@test.com&quot;, &quot;test dos&quot;).catch((err)=&gt; console.log(&quot;error al crear usuario&quot;));const res=await createProject({ projectName:&quot;roleTest&quot;, estimation:&quot;10&quot;, scrumMasterId:&quot;sprintTest&quot;, }).catch((err)=&gt; console.log(&quot;error al crear proyecto&quot;));projectId=res.data.id;}):&#160;sprints.test.js'],['../userStories_8test_8js.html#a79c2e4a552097b38119813364192ce49',1,'beforeAll(async()=&gt; { await getUser(&quot;usTest&quot;, &quot;ustest@test.com&quot;, &quot;test uno&quot;).catch((err)=&gt; console.log(&quot;error al crear usuario&quot;));await getUser(&quot;usTest2&quot;, &quot;ustest2@test.com&quot;, &quot;test dos&quot;).catch((err)=&gt; console.log(&quot;error al crear usuario&quot;));const res=await createProject({ projectName:&quot;roleTest&quot;, estimation:&quot;10&quot;, scrumMasterId:&quot;usTest&quot;, }).catch((err)=&gt; console.log(&quot;error al crear proyecto&quot;));projectId=res.data.id;}):&#160;userStories.test.js']]],
  ['burndown_527',['BurnDown',['../components_2graficoBurnDown_2index_8js.html#ad0c2a3c3be41dc5127b0520246924ef7',1,'index.js']]]
];
