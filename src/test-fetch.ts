// src/test-fetch.ts

async function testFetch() {
  // 使用 httpbin.org 作为测试目标，它会返回我们发送的请求信息
  const url = "https://httpbin.org/get";
  
  console.log(`[1] 准备发起请求: ${url}`);
  
  try {
    // 记录开始时间
    const startTime = Date.now();

    // 核心操作：发起 Fetch 请求
    // 注意：这里返回的是一个 Response 对象，里面包含了状态码、headers、body 等
    const response = await fetch(url);

    const endTime = Date.now();
    
    console.log(`[2] 请求完成，耗时: ${endTime - startTime}ms`);
    console.log(`[3] HTTP 状态码: ${response.status}`);
    console.log(`[4] 响应头 Content-Type: ${response.headers.get('content-type')}`);

    // 关键一步：检查请求是否成功
    if (!response.ok) {
      // 注意：fetch 只有在断网等网络层错误时才会 reject (抛错)
      // 如果是 404 或 500，fetch 不会抛错，需要手动判断 ok
      throw new Error(`请求失败，状态码: ${response.status}`);
    }

    // 核心操作：解析 Body
    // response.json() 会读取流(Stream)并解析为 JSON 对象
    const data = await response.json();
    
    console.log(`[5] 成功解析 JSON 数据，包含的键:`, Object.keys(data));
    console.log(`[6] 数据预览:`, JSON.stringify(data, null, 2).slice(0, 200) + "...\n");

  } catch (error) {
    console.error(`[X] 发生错误:`, error);
  }
}

// 执行测试
testFetch();