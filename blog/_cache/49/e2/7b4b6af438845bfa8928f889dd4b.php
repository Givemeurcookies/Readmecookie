<?php

/* index.html */
class __TwigTemplate_49e27b4b6af438845bfa8928f889dd4b extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        echo "<!DOCTYPE html>
\t<head>
\t\t<title>The blog</title>
\t\t<!--[if lt IE 9]>    <script src=\"http://html5shiv.googlecode.com/svn/trunk/html5.js\"></script><![endif]-->
\t\t<meta charset=\"utf-8\">
\t\t<link rel=\"stylesheet\" type=\"text/css\" href=\"/blog/static/css/main.css\">
\t\t<link rel=\"shortcut icon\" href=\"/img/favicon.ico\" />
\t</head>
\t<body>
\t\t<div id=\"slider\"></div>
\t\t<div id=\"leftcont\">
\t\t\t<header><img src=\"/blog/static/img/logo.svg\"><h1>Readmecookie</h1></header>
\t\t\t";
        // line 13
        if (isset($context["posts"])) { $_posts_ = $context["posts"]; } else { $_posts_ = null; }
        $context['_parent'] = (array) $context;
        $context['_seq'] = twig_ensure_traversable($_posts_);
        foreach ($context['_seq'] as $context["_key"] => $context["post"]) {
            // line 14
            echo "\t\t\t<article>
\t\t\t\t<h2>";
            // line 15
            if (isset($context["post"])) { $_post_ = $context["post"]; } else { $_post_ = null; }
            echo twig_escape_filter($this->env, $this->getAttribute($_post_, "title"), "html", null, true);
            echo "</h2>
\t\t\t\t";
            // line 16
            if (isset($context["post"])) { $_post_ = $context["post"]; } else { $_post_ = null; }
            echo twig_escape_filter($this->env, $this->getAttribute($_post_, "article"), "html", null, true);
            echo "
\t\t\t</article>
\t\t\t";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['post'], $context['_parent'], $context['loop']);
        $context = array_merge($_parent, array_intersect_key($context, $_parent));
        // line 19
        echo "\t\t</div>

\t\t<aside id=\"rightcont\">
\t\t\t<form method=\"post\" id=\"search\" action=\"search.html\">
\t\t\t\t<input type=\"text\" placeholder=\"search\" name=\"search\" id=\"field\"/><button type=\"submit\" class=\"submit\"><div id=\"submit\"><img src=\"/blog/static/img/iconsheetn.svg#search\"></div></button>
\t\t\t</form>
\t\t\t<a><img src=\"/blog/static/img/iconsheetn.svg#github\" id=\"github\"></a>
\t\t\t<a><img src=\"/blog/static/img/iconsheetn.svg#login\" id=\"github\"></a>
\t\t\t<div id=\"meta-info\">
\t\t\t\tCurrently under construction!
\t\t\t\t<!--<div class=\"box\" id=\"status\"> <span>Status:</span> Sleeping in a toaster</div>
\t\t\t\t<div class=\"box\" id=\"location\"> <span>Location:</span> Tracker offline</div>
\t\t\t\t<div class=\"box\" id=\"lastpost\" class=\"box\"> <span>Last post:</span> Our generations game expectations</div>
\t\t\t\t<div style=\"clear: both;\"></div>-->
\t\t\t</div>
\t\t\t<div style=\"clear: both;\"></div>
\t\t\t<form method=\"post\" id=\"login\" action=\"contact.html\">
\t\t\t\t<div id=\"name\">
\t\t\t\t\t<label for=\"username\">Username</label><br>
\t\t\t\t\t<input type=\"text\" placeholder=\"Username\" name=\"username\" id=\"name\" /><br>
\t\t\t\t</div>
\t\t\t\t<div id=\"pass\">
\t\t\t\t\t<label for=\"pass\">Password</label><br>
\t\t\t\t\t<input type=\"password\" placeholder=\"Password\" name=\"pass\" id=\"pass\" /><br>
\t\t\t\t</div>
\t\t\t\t<div id=\"indicator\"></div>
\t\t\t</form>
\t\t\t<div style=\"clear: both;\"></div>
\t\t\t<footer>Copyright @ 2013, Bitkraken</footer>
\t\t</aside>
\t\t<div class=\"clean\"></div>
\t</body>
\t<script src=\"/blog/static/js/rap.min.js\"></script>
\t<script src=\"/blog/static/js/spin.min.js\"></script>
\t<script type=\"text/javascript\"> 
\twindow.onload = function() {
\t\tvar opts = {
\t\t\tlines: 7, // The number of lines to draw
\t\t\tlength: 0, // The length of each line
\t\t\twidth: 6, // The line thickness
\t\t\tradius: 10, // The radius of the inner circle
\t\t\tcorners: 0.6, // Corner roundness (0..1)
\t\t\trotate: 0, // The rotation offset
\t\t\tcolor: '#fff', // #rgb or #rrggbb
\t\t\tspeed: 0.9, // Rounds per second
\t\t\ttrail: 70, // Afterglow percentage
\t\t\tshadow: true, // Whether to render a shadow
\t\t\thwaccel: true, // Whether to use hardware acceleration
\t\t\tclassName: 'spinner', // The CSS class to assign to the spinner
\t\t\tzIndex: 2e9, // The z-index (defaults to 2000000000)
\t\t\ttop: 'auto', // Top position relative to parent in px
\t\t\tleft: 'auto' // Left position relative to parent in px
\t\t};
\t\tvar target = document.getElementById('indicator');
\t\tvar spinner = new Spinner(opts);
\t\t//spinner.spin(target);
\t}
\t</script>
</html>";
    }

    public function getTemplateName()
    {
        return "index.html";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  56 => 19,  46 => 16,  41 => 15,  38 => 14,  33 => 13,  19 => 1,);
    }
}
