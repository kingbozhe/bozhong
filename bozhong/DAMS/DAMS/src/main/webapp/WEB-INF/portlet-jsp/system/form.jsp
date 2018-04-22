<%@ page contentType="text/html; charset=UTF-8" language="java" errorPage="" %>
<!DOCTYPE html>

<!--主体内容main-->
<div class="main">
    <!--主要内容container-->
    <div class="zcontainer">
        <!--主体内容-->
        <div class="box">
            <!--筛选框-->
            <div class="col-md-12 ifilter" id="ifilter">
              <form id="entityForm" method="post" class="coverpopup" action="/DAMS/bizEntity/save">
                    <!-- <div class="iline col-sm-12">
                        	文本框
                            <em>输入名称</em>
                            <div class="sinput">
                                <input class="itext form-control" placeholder="请输入名称" aria-describedby="basic-addon1" type="text">
                            </div>
                    </div>
                    <div class="iline col-sm-12">
                        <div class="im col-xs-12">下拉选择
                            <em>筛选名称</em>
                            <div class="sinput sdrop">
                                <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i>全部</i>
                                    <span class="caret"></span>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenu3">
                                    <li><a href="#">选项 1</a></li>
                                    <li><a href="#">选项 2</a></li>
                                    <li><a href="#">选项 3</a></li>
                                    <li><a href="#">选项 4</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="iline col-sm-12">
                        <div class="im col-xs-12">输入搜索
                            <em>导入</em>
                            <div class="sinput input-group">
                                <input class="form-control" placeholder="" aria-describedby="basic-addon2" type="text">
                                <span class="input-group-addon">
                                    <i class="fa fa-upload"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="iline col-sm-12">
                        <div class="im col-xs-12">点选
				            <em>复选</em>
				            <div class="sinput scheck">
				                <div class="sra left">
				                    <input type="checkbox">
				                    <em>选项1</em>
				                </div>
				                <div class="sra right">
				                    <input type="checkbox">
				                    <em>选项2</em>
				                </div>
				                <div class="sra right">
				                    <input type="checkbox">
				                    <em>选项3</em>
				                </div>
				            </div>
				
				        </div>
                    </div> -->
              </form>
            </div>
        </div>
        
    </div>
</div>
<!--主要内容container--End-->
<!--主体内容main--End-->

<script src="ui/js/form.js"></script>
