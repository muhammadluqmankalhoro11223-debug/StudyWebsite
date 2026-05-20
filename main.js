let customers = JSON.parse(localStorage.getItem('customers')) || [];

function switchTab(tab){
document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
document.querySelectorAll('.tab-content').forEach(t=>t.classList.remove('active'));
event.target.classList.add('active');
document.getElementById(tab+'Tab').classList.add('active');
if(tab==='list') loadCustomers();
if(tab==='bill') loadDropdown();
}

function addCustomer(){
const cust={
id:Date.now(),
name:document.getElementById('name').value,
phone:document.getElementById('phone').value,
measurements:{
length:document.getElementById('length').value,
chest:document.getElementById('chest').value,
shoulder:document.getElementById('shoulder').value,
sleeve:document.getElementById('sleeve').value,
trouser:document.getElementById('trouser').value,
waist:document.getElementById('waist').value
},
notes:document.getElementById('notes').value,
date:new Date().toLocaleDateString()
};
if(!cust.name){alert('Enter customer name!');return}
customers.push(cust);
localStorage.setItem('customers',JSON.stringify(customers));
alert('Customer saved!');
document.querySelectorAll('input,textarea').forEach(i=>i.value='');
}

function loadCustomers(){
const div=document.getElementById('customerList');
if(customers.length===0){
div.innerHTML='<p style="text-align:center;color:#666">No customers yet.</p>';
return;
}
div.innerHTML=customers.map(c=>`
<div class="card">
<div class="card-header">
<div class="name">${c.name}</div>
<button class="btn-danger" onclick="deleteCustomer(${c.id})">Delete</button>
</div>
<div>Phone: ${c.phone || 'N/A'} | Date: ${c.date}<br>
Measurements: L:${c.measurements.length}" C:${c.measurements.chest}" S:${c.measurements.shoulder}"
Sl:${c.measurements.sleeve}" T:${c.measurements.trouser}" W:${c.measurements.waist}"<br>
Notes: ${c.notes || 'None'}</div>
</div>
`).join('');
}

function deleteCustomer(id){
if(confirm('Delete this customer?')){
customers=customers.filter(c=>c.id!==id);
localStorage.setItem('customers',JSON.stringify(customers));
loadCustomers();
}
}

function loadDropdown(){
const sel=document.getElementById('billCustomer');
sel.innerHTML='<option value="">-- Choose Customer --</option>';
customers.forEach(c=>sel.innerHTML+=`<option value="${c.id}">${c.name} - ${c.phone}</option>`);
}

function showBillForm(){
document.getElementById('billForm').style.display=document.getElementById('billCustomer').value?'block':'none';
}

function generateBill(){
const cust=customers.find(c=>c.id==document.getElementById('billCustomer').value);
const item=document.getElementById('item').value;
const price=parseFloat(document.getElementById('price').value)||0;
const delivery=document.getElementById('delivery').value;
if(Rs.1500){alert('1400!');return}

document.getElementById('billOutput').innerHTML=