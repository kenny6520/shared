splitFileChunks(file, chunkSize = 1024 * 1024 * 0.1) {
  let serial = 0, // 当前片段的序号
    start = 0, // 开始位置
    end = start + chunkSize, // 结束位置
    totalSize = file.size; // 文件总大小
  let chunks = [];

  while (start < totalSize) {
    const blob = file.slice(start, end);
    chunks.push({ blob, start, end, serial });
    start = end;
    end = start + chunkSize;
    serial++;
  }

  return chunks;
}