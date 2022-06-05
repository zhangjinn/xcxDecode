<template>
    <div class="main-body">
      <div class="screen">
        <div class="container-row">
          <div class="label">高德地图key(选填):</div>
          <div class="gaode-map-key">
            <el-input
              :disabled="!isCanClick"
              placeholder="请输入"
              v-model="gaodeMapKey">
            </el-input>
            <a href="https://lbs.amap.com/dev/key" class="apply" target="_blank">申请Key</a>
            <div class="apply documentation" @click="downloadDocumentation()">操作指南</div>
          </div>
        </div>

        <div class="container-row upload-row">
          <div class="label">上传文件:</div>
          <div class="import">
            <el-upload action=""
                       :disabled="!isCanClick"
                       :show-file-list="false"
                       :file-list="fileList"
                       style="display: flex; align-items: flex-start;"
                       accept=".xls,.XLS,.xlsx,.XLSX"
                       :limit="1"
                       :on-exceed="handleExceed"
                       :http-request="httpRequest">
              <el-button size="mini">选择文件</el-button>
              <div slot="tip" class="el-upload__tip">
                <div class="condition">仅支持上传xls、xlsx文件</div>
              </div>
            </el-upload>
            <div class="file-list">
              <ul class="el-upload-list el-upload-list--text">
                <li v-for="(file,index) of fileList" tabindex="0" class="el-upload-list__item is-ready">
                  <a class="el-upload-list__item-name">
                    <img class="icon" src="../../assets/image/downLoad.png" alt="">
                    <span>{{ file.name }}</span>
                  </a>
                  <i v-if="isCanClick" class="el-icon-close" @click="handleRemove(index)"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="container-row export-row">
          <div class="label"></div>
          <div class="export">
            <el-button size="mini" :disabled="!isCanClick" @click="toResolution">地址解析并下载</el-button>
            <el-progress v-if="percentage" :percentage="percentage" color="#00AAA6"></el-progress>
            <div v-if="percentage >= 100" class="result-tip">解析完成，合计 <span>{{readData.length}}</span> 条记录，成功识别 <span>{{hitCount}}</span> 条，失败 <span>{{readData.length - hitCount}}</span> 条，识别率：<span>{{parseInt(hitCount * 10000 / readData.length) / 100}}%</span></div>
          </div>
        </div>

      </div>
    </div>
</template>

<script src="./index.js"></script>
<style lang="less" src="./index.less"></style>
