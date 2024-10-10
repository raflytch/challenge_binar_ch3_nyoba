const pingServers = (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Ping successfully",
  });
};

module.exports = { pingServers };
