function filterNodes(keyWord) {
  if (!keyWord.length) {
    window.alert("Please type key word firstly.");
    return;
  } else {
    var $chart = $(".orgchart");
    // disalbe the expand/collapse feture
    $chart.addClass("noncollapsable");
    // distinguish the matched nodes and the unmatched nodes according to the given key word
    $chart
      .find(".node")
      .filter(function(index, node) {
        return (
          $(node)
            .text()
            .toLowerCase()
            .indexOf(keyWord) > -1
        );
      })
      .addClass("matched")
      .closest("table")
      .parents("table")
      .find("tr:first")
      .find(".node")
      .addClass("retained");
    // hide the unmatched nodes
    $chart.find(".matched,.retained").each(function(index, node) {
      $(node)
        .removeClass("slide-up")
        .closest(".nodes")
        .removeClass("hidden")
        .siblings(".lines")
        .removeClass("hidden");
      var $unmatched = $(node)
        .closest("table")
        .parent()
        .siblings()
        .find(".node:first:not(.matched,.retained)")
        .closest("table")
        .parent()
        .addClass("hidden");
      $unmatched
        .parent()
        .prev()
        .children()
        .slice(1, $unmatched.length * 2 + 1)
        .addClass("hidden");
    });
    // hide the redundant descendant nodes of the matched nodes
    $chart.find(".matched").each(function(index, node) {
      if (
        !$(node)
          .closest("tr")
          .siblings(":last")
          .find(".matched").length
      ) {
        $(node)
          .closest("tr")
          .siblings()
          .addClass("hidden");
      }
    });
  }
}

function clearFilterResult() {
  $(".orgchart")
    .removeClass("noncollapsable")
    .find(".node")
    .removeClass("matched retained")
    .end()
    .find(".hidden")
    .removeClass("hidden")
    .end()
    .find(".slide-up, .slide-left, .slide-right")
    .removeClass("slide-up slide-right slide-left");
}

(function($) {
  $(function() {
    var ds = {
      name: "Alok kumar",
      title: "CEO & President ",
      mail: "aalok.kumar@india.nec.com",
      children: [
        {
          name: "Bo Miao",
          title: "department manager",
          mail: "brijesh",
          children: [
            { name: "User21", title: "senior engineer" },
            {
              name: "User22",
              title: "senior engineer",
              children: [
                { name: "User31", title: "engineer" },
                { name: "User32", title: "engineer" },
                { name: "User33", title: "engineer" },
                { name: "User34", title: "engineer" },
              ]
            }
          ]
        },
        {
          name: "Bo Miao",
          title: "department manager",
          mail: "brijesh",
          children: [
            { name: "Li Jing", title: "senior engineer" },
            {
              name: "Li Xin",
              title: "senior engineer",
              children: [
                { name: "To To", title: "engineer" },
                { name: "Fei Fei", title: "engineer" },
                { name: "Xuan Xuan", title: "engineer" }
              ]
            }
          ]
        },
        {
          name: "Su Miao",
          title: "department manager",
          children: [
            { name: "Pang Pang", title: "senior engineer" },
            {
              name: "Hei Hei",
              title: "senior engineer",
              children: [
                { name: "Xiang Xiang", title: "UE engineer" },
                { name: "Dan Dan", title: "engineer" },
                { name: "Zai Zai", title: "engineer" }
              ]
            }
          ]
        }
      ]
    };

    var oc = $("#chart-container").orgchart({
      data: ds,
      nodeContent: "title",
      nodeMail:"mail"
    });
    $("#btn-filter-node").on("click", function() {
      filterNodes($("#key-word").val());
    });

    $("#btn-cancel").on("click", function() {
      clearFilterResult();
    });

    $("#key-word").on("keyup", function(event) {
      if (event.which === 13) {
        filterNodes(this.value);
      } else if (event.which === 8 && this.value.length === 0) {
        clearFilterResult();
      }
    });
  });
})(jQuery);
