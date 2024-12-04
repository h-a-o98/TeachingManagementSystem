import Vue from "vue";
import {
    Menu, MenuItem, Tabs, TabPane, Button, Tree, Checkbox, Dialog, Form,
    FormItem, Input, InputNumber, Select, Option,Upload,DatePicker,Col,
    Table,TableColumn, Dropdown,DropdownMenu, DropdownItem,Link,Radio,
    RadioGroup,
    RadioButton, Cascader,
} from 'element-ui';
const uis = [Menu, MenuItem, Tabs, TabPane, Button, Tree, Checkbox, Dialog, Form,
    FormItem, Input, InputNumber, Select, Option,Upload, DatePicker,Col, Table,
    TableColumn, Dropdown,DropdownMenu,DropdownItem,Link,Radio,
    RadioGroup,
    RadioButton, Cascader,];
uis.map(item => Vue.use(item));